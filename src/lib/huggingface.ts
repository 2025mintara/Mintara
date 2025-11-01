// Hugging Face API Integration for AI NFT Generation
import axios from 'axios';

const HF_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';
const HF_API_TOKEN = import.meta.env.VITE_HF_TOKEN || '';

export interface GenerateImageParams {
  prompt: string;
  negativePrompt?: string;
  numInferenceSteps?: number;
  guidanceScale?: number;
  width?: number;
  height?: number;
}

export interface GeneratedImage {
  blob: Blob;
  url: string;
  prompt: string;
  timestamp: number;
}

// Debounce helper for API calls
let debounceTimer: NodeJS.Timeout;
const debounceDelay = 10000; // 10 seconds

export const generateImage = async (
  params: GenerateImageParams
): Promise<GeneratedImage> => {
  try {
    // Check if HF token is available
    if (!HF_API_TOKEN) {
      console.warn('Hugging Face API token not configured. Using mock data.');
      return generateMockImage(params.prompt);
    }

    const response = await axios.post(
      HF_API_URL,
      {
        inputs: params.prompt,
        parameters: {
          negative_prompt: params.negativePrompt || 'low quality, blurry, distorted',
          num_inference_steps: params.numInferenceSteps || 30,
          guidance_scale: params.guidanceScale || 7.5,
          width: params.width || 512,
          height: params.height || 512,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      }
    );

    const blob = new Blob([response.data], { type: 'image/png' });
    const url = URL.createObjectURL(blob);

    return {
      blob,
      url,
      prompt: params.prompt,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Failed to generate image:', error);
    // Fallback to mock image on error
    return generateMockImage(params.prompt);
  }
};

// Generate mock image for development/testing
const generateMockImage = (prompt: string): GeneratedImage => {
  // Create a simple gradient canvas as mock image
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, '#00a676');
  gradient.addColorStop(0.5, '#00e0c6');
  gradient.addColorStop(1, '#96f9c4');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  
  // Add text
  ctx.fillStyle = '#001a12';
  ctx.font = 'bold 24px Inter Tight';
  ctx.textAlign = 'center';
  ctx.fillText('AI Generated NFT', 256, 256);
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob!);
      resolve({
        blob: blob!,
        url,
        prompt,
        timestamp: Date.now(),
      });
    });
  }) as any;
};

// Batch generate multiple images
export const generateMultipleImages = async (
  prompt: string,
  count: number = 3
): Promise<GeneratedImage[]> => {
  const promises = Array.from({ length: count }, () =>
    generateImage({ prompt })
  );
  
  return Promise.all(promises);
};

// Cache recent prompts
const promptCache = new Map<string, GeneratedImage[]>();

export const getCachedImages = (prompt: string): GeneratedImage[] | null => {
  return promptCache.get(prompt) || null;
};

export const cacheImages = (prompt: string, images: GeneratedImage[]) => {
  promptCache.set(prompt, images);
  
  // Clear old cache entries after 10 minutes
  setTimeout(() => {
    promptCache.delete(prompt);
  }, 600000);
};

// Style presets for quick generation
export const stylePresets = {
  cartoon: {
    negativePrompt: 'realistic, photo, 3d',
    guidanceScale: 8.0,
  },
  realistic: {
    negativePrompt: 'cartoon, anime, drawing',
    guidanceScale: 7.0,
  },
  baseGlow: {
    negativePrompt: 'dark, muted colors',
    guidanceScale: 7.5,
  },
  abstract: {
    negativePrompt: 'realistic, photo, portrait',
    guidanceScale: 9.0,
  },
};
