async function askAI(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ANTHROPIC_API_KEY}`
    },
    body: JSON.stringify({ model: 'gpt-5-nano', input: prompt })
  });
  const data = await response.json();
  const message = data.output.find(item => item.type === 'message');
  return message.content[0].text;
}

const story = await askAI('Write a one-sentence bedtime story about a unicorn.');

<><textarea id="prompt"
    placeholder="Ask AI anything..."></textarea><button id="askBtn">Ask</button><p id="answer"></p></>


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