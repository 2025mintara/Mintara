export async function generateImage(prompt: string): Promise<string> {
  const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  
  if (!API_KEY) {
    throw new Error('Hugging Face API key not configured');
  }

  const response = await fetch(
    'https://api-inference.huggingface.co/models/stabilityai/sdxl-turbo',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          num_inference_steps: 4,
          guidance_scale: 0.0,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Image generation failed: ${error}`);
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
