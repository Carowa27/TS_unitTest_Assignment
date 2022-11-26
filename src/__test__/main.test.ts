/**
 * @jest-environment jsdom
 */
import { test, expect, describe, jest, beforeEach } from "@jest/globals";

import * as mainFunctions from "./../ts/main";
import * as functions from "./../ts/functions";
import { Todo } from "./../ts/models/Todo";
import { IAddResponse } from "../ts/models/IAddResult";

describe("init", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  //testa localStorage.getItem???
  test("should start clearTodos with click", () => {
    console.log("test:should start clearTodos with click");
    //arrange
    let spy = jest.spyOn(mainFunctions, "clearTodos").mockReturnValue();
    document.body.innerHTML = `<button type="button" id="clearTodos">Rensa lista</button>`;
    mainFunctions.init();
    //act
    document.getElementById("clearTodos")?.click();
    //assert
    expect(spy).toHaveBeenCalled();
  });
  test("should start createNewTodo with submit", () => {
    console.log("test:should start createNewTodo with submit");
    //arrange
    let spy = jest.spyOn(mainFunctions, "createNewTodo").mockReturnValue();
    document.body.innerHTML = `<form id="newTodoForm">
    <div>
      <input type="text" id="newTodoText" />
      <button id="btnCreateTodo">Skapa</button>
      <button type="button" id="clearTodos">Rensa lista</button>
    </div>
    <div id="error" class="error"></div>
  </form>`;
    mainFunctions.init();
    //act
    document.getElementById("btnCreateTodo")?.click();
    //assert
    expect(spy).toHaveBeenCalled();
  });
});

describe("createNewTodo", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  //   testa if
  test("should start function createHtml if todo is added successfully", () => {
    console.log(
      "should start function createHtml if todo is added successfully"
    );
    // //arrange
    let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();
    let watcher = jest.spyOn(mainFunctions, "displayError").mockReturnValue();

    let task: string = "handla";
    let theList: Todo[] = [
      { text: "städa", done: false },
      { text: "tvätta", done: false },
    ];
    let result: IAddResponse = functions.addTodo(task, theList);
    mainFunctions.init();
    //     act
    mainFunctions.createNewTodo(task, theList);
    //     assert
    expect(result.success).toBe(true);
    expect(spy).toHaveBeenCalled();
    //arrange
    // let theList: Todo[] = [
    //   { text: "städa", done: false },
    //   { text: "tvätta", done: false },
    // ];
    // document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    // let todosContainer: HTMLUListElement = document.getElementById(
    //   "todos"
    // ) as HTMLUListElement;
    // todosContainer.innerHTML = "";
    // let taskText: string = "handla";
    // let result: IAddResponse = functions.addTodo(taskText, theList);
    // let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();
    // let watcher = jest.spyOn(mainFunctions, "displayError").mockReturnValue();
    // mainFunctions.init();
    // //act
    // mainFunctions.createNewTodo(taskText, theList);
    // //assert
    // expect(result.success).toBe(true);
    //expect(spy).toHaveBeenCalled();
  });
  //   //testa else
  test("should start displayError if todo not added successfully", () => {
    console.log("should start displayError if todo not added successfully");
    //   arrange
    let spy = jest.spyOn(mainFunctions, "displayError").mockReturnValue();
    let todoText: string = "";
    let theList: Todo[] = [
      { text: "städa", done: false },
      { text: "tvätta", done: false },
    ];
    let result: IAddResponse = functions.addTodo(todoText, theList);
    //act
    mainFunctions.createNewTodo(todoText, theList);
    //assert
    expect(result.success).toBe(false);
    expect(spy).toHaveBeenCalled();
  });
});

describe("createHtml", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  //testa localStorage.setItem
  //     test("should setItem in localStorage", () => {
  //       //arrange
  // let spy = jest.spyOn(mainFunctions,"setItem").mockReturnValue;

  //       let theList: Todo[] = [
  //         { text: "städa", done: false },
  //         { text: "tvätta", done: false },
  //       ];

  //       //act
  //       mainFunctions.createHtml(theList);
  //       //assert
  //       console.log(theList.length);
  //       expect(result.success).toBe(true);
  //       //expect(spy).toHaveBeenCalled();
  //     });
  //testa if
  test("should make list in HTML with done tasks", () => {
    console.log("test:should make list in HTML with done tasks");
    //arrange
    let theList: Todo[] = [
      { text: "städa", done: true },
      { text: "tvätta", done: true },
    ];
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let todosContainer: HTMLUListElement = document.getElementById(
      "todos"
    ) as HTMLUListElement;
    //act
    console.log(theList);
    mainFunctions.createHtml(theList);
    //assert
    expect(theList[theList.length - 1].done).toBe(true);
    expect(todosContainer.innerHTML).toBe(
      `<li class="todo__text--done todo__text">städa</li><li class="todo__text--done todo__text">tvätta</li>`
    );
  });
  //testa else
  test("should make list in HTML with not done tasks", () => {
    console.log("test:should make list in HTML with not done tasks");
    //arrange
    let theList: Todo[] = [
      { text: "städa", done: false },
      { text: "tvätta", done: false },
    ];
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let todosContainer: HTMLUListElement = document.getElementById(
      "todos"
    ) as HTMLUListElement;

    //act
    mainFunctions.createHtml(theList);
    //assert
    expect(theList[theList.length - 1].done).toBe(false);
    expect(todosContainer.innerHTML).toBe(
      `<li class="todo__text">städa</li><li class="todo__text">tvätta</li>`
    );
  });
  //testa addEventListener
  //   test("should start toggleTodo function when li tag is clicked", () => {
  //     console.log("should start toggleTodo function when li tag is clicked");
  //     // //arrange
  //     // let spy = jest.spyOn(mainFunctions, "toggleTodo").mockReturnValue();
  //     // // let liTag: HTMLLIElement = document.getElementById(
  //     // //   "liTag"
  //     // // ) as HTMLLIElement;
  //     let theList: Todo[] = [
  //       { text: "städa", done: false },
  //       { text: "tvätta", done: false },
  //     ];
  //     // document.body.innerHTML = `<ul id="todos" class="todo"><li id="liTag">test</li></ul>`;
  //     // mainFunctions.createHtml(theList);

  //     // //act
  //     // document.getElementById("liTag")?.click();
  //     // //assert
  //     // expect(spy).toHaveBeenCalled();
  //     //arrange
  //     let spy = jest.spyOn(mainFunctions, "toggleTodo").mockReturnValue();
  //     document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

  //     mainFunctions.createHtml(theList);
  //     //act
  //     document.getElementById("todo__text")?.click();
  //     //assert
  //     expect(theList[theList.length - 1].done).toBe(true);
  //     //expect(spy).toHaveBeenCalled();
  //   });
});

describe("toggleTodo", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should start changeTodo function", () => {
    console.log("test:should start changeTodo function");
    //arrange
    let spy = jest.spyOn(functions, "changeTodo").mockReturnValue();
    let todoTask: Todo = new Todo("handla", false);
    //act
    mainFunctions.toggleTodo(todoTask);
    //assert
    expect(spy).toHaveBeenCalled();
  });
  test("should start createHtml function", () => {
    console.log("test:should start createHtml function");
    //arrange
    let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();
    let todoTask: Todo = new Todo("handla", false);

    //act
    mainFunctions.toggleTodo(todoTask);
    //assert
    expect(spy).toHaveBeenCalled();
  });
});

describe("displayError", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should show content in errorContainer", () => {
    console.log("test:should show content in errorContainer");
    //arrange
    let error: string = "errorMsg";
    let show: boolean = true;
    document.body.innerHTML = `<div id="error"></div>`;
    let errorContainer: HTMLDivElement = document.getElementById(
      "error"
    ) as HTMLDivElement;
    errorContainer.innerHTML = error;
    //act
    mainFunctions.displayError(error, show);
    //assert
    expect(errorContainer.classList.length).toBe(1);
    expect(errorContainer.innerHTML).toBe("errorMsg");
  });

  test("should not show content in errorContainer", () => {
    console.log("test:should not show content in errorContainer");
    //arrange
    let error: string = "errorMsg";
    let show: boolean = false;
    document.body.innerHTML = `<div id="error"></div>`;
    let errorContainer: HTMLDivElement = document.getElementById(
      "error"
    ) as HTMLDivElement;
    errorContainer.innerHTML = error;
    //act
    mainFunctions.displayError(error, show);
    //assert
    expect(errorContainer.classList.length).toBe(0);
  });
});

describe("clearTodos", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should start function removeAllTodos", () => {
    console.log("test:should start function removeAllTodos");
    // arrange
    let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();
    let watcher = jest.spyOn(functions, "removeAllTodos").mockReturnValue();

    let theList: Todo[] = [
      { text: "städa", done: false },
      { text: "tvätta", done: false },
    ];
    //     act
    mainFunctions.clearTodos(theList);
    //     assert
    expect(watcher).toHaveBeenCalled();
  });

  test("should start function createHtml", () => {
    console.log("test:should start function createHtml");
    // //arrange
    let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();
    let watcher = jest.spyOn(functions, "removeAllTodos").mockReturnValue();

    let theList: Todo[] = [
      { text: "städa", done: false },
      { text: "tvätta", done: false },
    ];
    //     act
    mainFunctions.clearTodos(theList);
    //     assert
    expect(spy).toHaveBeenCalled();
  });
});

// describe("window onload????", () => {
//   beforeEach(() => {
//     jest.resetModules();
//     jest.restoreAllMocks();
//   });
//   //testa att window onload startar init
//   test("should start init function", () => {
//     //arrange
//     let spy = jest.spyOn(mainFunctions, "init").mockReturnValue();
//     let watcher = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();

//     let theList: Todo[] = [
//       { text: "städa", done: false },
//       { text: "tvätta", done: false },
//     ];

//     //act
//     window.onload = function () {
//       mainFunctions.init();
//       mainFunctions.createHtml(theList);
//     };
//     //assert
//     expect(spy).toHaveBeenCalled();
//   });
//   //testa att window onload startar createHtml
//   test("should start init function", () => {
//     //arrange
//     let spy = jest.spyOn(mainFunctions, "init").mockReturnValue();
//     let watcher = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();

//     document.body.innerHTML = "";

//     let theList: Todo[] = [
//       { text: "städa", done: false },
//       { text: "tvätta", done: false },
//     ];

//     //act
//     script.onload =
//     window.onload = function () {
//       mainFunctions.init();
//       mainFunctions.createHtml(theList);
//     };
//     //assert
//     expect(watcher).toHaveBeenCalled();
//   });
// });
