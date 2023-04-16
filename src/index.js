import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO"
const DELETE_TODO = "DELETE_TODO"

// 주의 : 반드시 state를 직접 변경하지 말 것(push, pop 등)
// state를 바꾸는 유일한 방법 => action을 보내는 것

// 즉, new state objects를 리턴해야 한다

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text 
  }
}

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

const reducer = (state = [], action) => {
  switch(action.type){
    case ADD_TODO:
      const newToDoObj = { text : action.text, id: Date.now() }
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== action.id);
      return cleaned;
    default:
      return state
  }
};

const store = createStore(reducer)

store.subscribe(()=> console.log(store.getState()));

const dispatchAddToDO = (text) => {
  store.dispatch(addToDo(text))
}

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id))
}

// 새로운 todo가 생기면,
const paintTodos = () => {
  const toDos = store.getState();
  // list 전체를 비우고
  ul.innerHTML = "";
  // state에 있는 각각의 toDo들을 이용해서 
  toDos.forEach(toDo => {
    // 새로운 li를 만든다
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL"
    btn.addEventListener("click", dispatchDeleteToDo)
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

store.subscribe(paintTodos)

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDO(toDo)
};

form.addEventListener("submit", onSubmit);