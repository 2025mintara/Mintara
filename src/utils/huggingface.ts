export async function generateImage(prompt: string): Promise<string> {
  try {
    // Using Pollinations AI - completely free, no API key required
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&model=flux&nologo=true&enhance=true`;
    
    // Fetch the image
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Image generation failed: ${response.statusText}`);
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
