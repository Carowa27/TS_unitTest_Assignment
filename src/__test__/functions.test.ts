import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";
import { IAddResponse } from "../ts/models/IAddResult";

describe("addTodo", () => {
  test("should add todo item", () => {
    //arrange, förutsättningar
    let task: string = "handla";
    let theList: Todo[] = [];
    let listLength: number = theList.length;
    //act, start av function
    addTodo(task, theList);
    //assert, förväntningar(received,expected)
    console.log(theList.length);
    expect(theList.length).toBe(listLength + 1);
  });
  test("should not get error message", () => {
    //arrange, förutsättningar
    let task: string = "kaffe";
    let theList: Todo[] = [];
    let responsemsg: IAddResponse = addTodo(task, theList);
    //act, start av function
    addTodo(task, theList);
    //assert, förväntningar(received,expected)
    expect(responsemsg.success).toBe(true);
  });
  test("should not add todo item if lenghts is less than 2 letters", () => {
    //arrange, förutsättningar
    let task: string = "te";
    let theList: Todo[] = [];
    let listLength: number = theList.length;
    //act, start av function
    addTodo(task, theList);
    //assert, förväntningar(received,expected)
    console.log(theList.length);
    expect(theList.length).toBe(listLength);
  });
  test("should get error message", () => {
    //arrange, förutsättningar
    let task: string = "te";
    let theList: Todo[] = [];
    let responsemsg: IAddResponse = addTodo(task, theList);
    //act, start av function
    addTodo(task, theList);
    //assert, förväntningar(received,expected)
    expect(responsemsg.success).toBe(false);
  });
});

test("should change status on todo item", () => {
  //arrange, förutsättningar
  let task: Todo = new Todo("handla", false);
  //act, start av function
  changeTodo(task);
  //assert, förväntningar(received,expected)
  expect(task.done).toBe(true);
});

test("should delete all todo items", () => {
  //arrange, förutsättningar
  let theList: Todo[] = [];
  let firstTask: Todo = new Todo("handla", false);
  let secondTask: Todo = new Todo("tvätta", false);
  let thirdTask: Todo = new Todo("städa", false);
  theList.push(firstTask);
  theList.push(secondTask);
  theList.push(thirdTask);
  //act, start av function
  removeAllTodos(theList);
  //assert, förväntningar(received,expected)
  expect(theList.length).toBe(0);
});
