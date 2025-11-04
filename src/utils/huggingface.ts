export async function generateImage(prompt: string): Promise<string> {
  const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  
  if (!API_KEY) {
    throw new Error('Hugging Face API key not configured');
  }

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API Error:', errorText);
      throw new Error(`Image generation failed: ${errorText}`);
    }

    const blob = await response.blob();
    
    if (blob.size === 0) {
      throw new Error('Received empty response from API');
    }
    
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Image generation error:', error);
    throw error;
  }
}
