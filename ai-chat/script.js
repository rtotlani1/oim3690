const STORAGE_KEY = 'ai-chat-history';
const messagesEl = document.querySelector('#messages');
const promptEl = document.querySelector('#prompt');
const composerEl = document.querySelector('#composer');
const SEED_HISTORY = [
  { sender: 'user', text: 'Make me a grocery list for the week.' },
  { sender: 'ai', text: 'Sure — milk, eggs, bread, apples, spinach, pasta, chicken, and yogurt.' },
  { sender: 'user', text: 'Suggest a few movies for a cozy night in.' },
  { sender: 'ai', text: 'Try The Grand Budapest Hotel, Paddington 2, and About Time.' }
];

function readHistory() {
  try {
    const storedHistory = JSON.parse(sessionStorage.getItem(STORAGE_KEY));

    if (Array.isArray(storedHistory) && storedHistory.length) {
      return storedHistory;
    }

    return SEED_HISTORY.map(message => ({ ...message }));
  } catch (error) {
    return SEED_HISTORY.map(message => ({ ...message }));
  }
}

function saveHistory(history) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn('Unable to save chat history:', error);
  }
}

function renderHistory(history = readHistory()) {
  messagesEl.innerHTML = '';

  if (!history.length) {
    const placeholder = document.createElement('div');
    placeholder.className = 'message ai';
    placeholder.textContent = 'Ask a question to begin the conversation.';
    messagesEl.appendChild(placeholder);
    return;
  }

  const fragment = document.createDocumentFragment();
  history.forEach(({ sender, text }) => {
    const bubble = document.createElement('div');
    bubble.className = `message ${sender === 'user' ? 'user' : 'ai'}`;
    bubble.textContent = text;
    fragment.appendChild(bubble);
  });

  messagesEl.appendChild(fragment);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function appendMessage(text, sender) {
  const history = readHistory();
  history.push({ sender, text });
  saveHistory(history);
  renderHistory(history);
}

function showTypingIndicator() {
  const typing = document.createElement('div');
  typing.id = 'typing-indicator';
  typing.className = 'message ai typing';
  typing.textContent = 'Thinking...';
  messagesEl.appendChild(typing);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.querySelector('#typing-indicator');
  if (typing) {
    typing.remove();
  }
}

async function askAI(prompt) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-5-nano',
      input: prompt
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Request failed.');
  }

  if (typeof data.output_text === 'string' && data.output_text) {
    return data.output_text;
  }

  const message = data.output?.find(item => item.type === 'message');
  const text = message?.content?.[0]?.text;

  if (text) {
    return text;
  }

  throw new Error('No response text returned.');
}

function sendMessage() {
  const prompt = promptEl.value.trim();
  if (!prompt) {
    return;
  }

  appendMessage(prompt, 'user');
  promptEl.value = '';
  promptEl.style.height = 'auto';
  showTypingIndicator();

  askAI(prompt)
    .then(answer => {
      removeTypingIndicator();
      appendMessage(answer, 'ai');
    })
    .catch(error => {
      removeTypingIndicator();
      appendMessage(`Error: ${error.message}`, 'ai');
    });
}

composerEl.addEventListener('submit', event => {
  event.preventDefault();
  sendMessage();
});

promptEl.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

promptEl.addEventListener('input', () => {
  promptEl.style.height = 'auto';
  promptEl.style.height = `${Math.min(promptEl.scrollHeight, 180)}px`;
});

document.addEventListener('DOMContentLoaded', () => {
  renderHistory();
  promptEl.focus();
});