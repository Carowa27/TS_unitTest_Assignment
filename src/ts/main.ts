import { addTodo, changeTodo, removeAllTodos } from "./functions";
import { Todo } from "./models/Todo";

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

export function init() {
  createHtml(todos);

  document.getElementById("clearTodos")?.addEventListener("click", () => {
    exports.clearTodos(todos);
  });

  (document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
    "submit",
    (e: SubmitEvent) => {
      e.preventDefault();

      let todoText: string = (
        document.getElementById("newTodoText") as HTMLInputElement
      ).value;
      console.log("Todos when creating", todos);

      exports.createNewTodo(todoText, todos);
    }
  );
  document.getElementById("sortListBtn")?.addEventListener("click", () => {
    exports.sortTask(todos);
  });
}
window.addEventListener("load", () => {
  // window.onload = function () {
  exports.init();
});

export function sortTask(list: Todo[]) {
  console.log("sortTask");
  list.sort((a, b) => {
    if (a.text.toUpperCase() < b.text.toUpperCase()) {
      return -1;
    }
    if (a.text.toUpperCase() > b.text.toUpperCase()) {
      return 1;
    }

    return 0;
  });
  createHtml(todos);
}

export function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos);

  if (result.success) {
    exports.createHtml(todos);
  } else {
    exports.displayError(result.error, true);
  }
}

export function createHtml(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));

  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li");

    if (todos[i].done) {
      li.classList.add("todo__text--done");
    }

    li.classList.add("todo__text");
    li.innerHTML = todos[i].text;
    li.addEventListener("click", () => {
      exports.toggleTodo(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

export function toggleTodo(todo: Todo) {
  changeTodo(todo);
  exports.createHtml(todos);
}

export function displayError(error: string, show: boolean) {
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  errorContainer.innerHTML = error;

  if (show) {
    errorContainer.classList.add("show");
  } else {
    errorContainer.classList.remove("show");
  }
}

export function clearTodos(todos: Todo[]) {
  removeAllTodos(todos);
  exports.createHtml(todos);
}
