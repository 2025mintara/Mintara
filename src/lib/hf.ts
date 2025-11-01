// Hugging Face API Integration
const HF_API_URL = 'https://api-inference.huggingface.co/models';
const HF_MODEL = 'stabilityai/stable-diffusion-xl-base-1.0';

export interface HFGenerationOptions {
  prompt: string;
  num_images?: number;
  negative_prompt?: string;
  num_inference_steps?: number;
  guidance_scale?: number;
}

export interface HFImageResponse {
  image: string; // base64 encoded image
  error?: string;
}

let promptCache: Map<string, { timestamp: number; response: HFImageResponse }> = new Map();
const CACHE_DURATION = 10000; // 10 seconds

export async function generateImageWithHF(
  options: HFGenerationOptions
): Promise<HFImageResponse> {
  const apiToken = import.meta.env.VITE_HF_TOKEN;
  
  if (!apiToken) {
    console.warn('Hugging Face API token not found. Using mock response.');
    return {
      image: generateMockImage(),
    };
  }

  // Check cache
  const cacheKey = `${options.prompt}-${options.num_images || 1}`;
  const cached = promptCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.response;
  }

  try {
    const response = await fetch(`${HF_API_URL}/${HF_MODEL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: options.prompt,
        parameters: {
          num_inference_steps: options.num_inference_steps || 50,
          guidance_scale: options.guidance_scale || 7.5,
          negative_prompt: options.negative_prompt || 'blurry, low quality, distorted',
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HF API error: ${error}`);
    }

    const blob = await response.blob();
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        const result: HFImageResponse = { image: base64Image };
        
        // Cache the result
        promptCache.set(cacheKey, {
          timestamp: Date.now(),
          response: result,
        });
        
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('HF API error:', error);
    return {
      image: generateMockImage(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

function generateMockImage(): string {
  // Generate a simple gradient placeholder as base64
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#001A12');
    gradient.addColorStop(0.5, '#00A676');
    gradient.addColorStop(1, '#00E0C6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
  }
  
  return canvas.toDataURL('image/png');
}

export function clearCache(): void {
  promptCache.clear();
}
