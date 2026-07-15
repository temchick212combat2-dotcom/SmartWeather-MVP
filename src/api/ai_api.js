export async function getAIRecomendation(prompt) {
  try {
    const response = await fetch('http://localhost:1234/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen/qwen3-1.7b',
        messages: [
          {
            role: 'system',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API error');
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    console.log('Ответ:', reply);
    return reply;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
