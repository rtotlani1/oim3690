const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearButton = document.getElementById("clear-btn");
const finishedCount = document.getElementById("finished-count");
const pendingCount = document.getElementById("pending-count");
const finishedBar = document.getElementById("finished-bar");
const pendingBar = document.getElementById("pending-bar");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateSummary() {
  const finished = todos.filter((todo) => todo.done).length;
  const pending = todos.length - finished;
  const total = todos.length || 1;
  const finishedPercent = (finished / total) * 100;
  const pendingPercent = (pending / total) * 100;

  finishedCount.textContent = finished;
  pendingCount.textContent = pending;
  finishedBar.style.width = `${finishedPercent}%`;
  pendingBar.style.width = `${pendingPercent}%`;
  clearButton.disabled = todos.length === 0;
}

function renderTodos() {
  list.innerHTML = "";
  updateSummary();

  if (todos.length === 0) {
    list.innerHTML = '<li class="empty-state">No tasks yet. Add one above.</li>';
    return;
  }

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <label class="todo-text ${todo.done ? "done" : ""}">
        <input type="checkbox" ${todo.done ? "checked" : ""} />
        <span>${todo.text}</span>
      </label>
      <button class="delete-btn" type="button">Delete</button>
    `;

    const checkbox = item.querySelector("input[type='checkbox']");
    const deleteButton = item.querySelector(".delete-btn");

    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    deleteButton.addEventListener("click", () => {
      todos = todos.filter((entry) => entry.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    list.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) return;

  todos.unshift({
    id: Date.now(),
    text,
    done: false,
  });

  saveTodos();
  input.value = "";
  renderTodos();
});

clearButton.addEventListener("click", () => {
  todos = [];
  saveTodos();
  renderTodos();
});

renderTodos();