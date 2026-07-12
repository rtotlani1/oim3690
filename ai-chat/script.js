async function askAI(prompt) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      input: prompt
    })
  });
  const data = await response.json();
  const message = data.output.find(item => item.type === 'message');
  return message.content[0].text;
}

document.querySelector('#askBtn')
  .addEventListener('click', async () => {
    const prompt =
      document.querySelector('#prompt').value;
    const answerEl =
      document.querySelector('#answer');
    answerEl.textContent = 'Thinking...';
    try {
      answerEl.textContent = await askAI(prompt);
    } catch (error) {
      answerEl.textContent = 'Error: ' + error.message;
    }
  });