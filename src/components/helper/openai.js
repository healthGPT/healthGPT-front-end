export const fetchCompletionOpenAI = async (inputText) => {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          prompt: inputText,
          model: 'gpt-3.5-turbo',
          max_tokens: 100,
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch completion from OpenAI API');
      }
  
      const data = await response.json();
      return data.choices[0].text;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  