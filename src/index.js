import { act } from "react-dom/test-utils";
import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

// reducer
// 1. 데이터를 수정하는 함수
// 2. return 하는 값 === 나의 application data

// 유일하게 한 개의 함수만 data를 수정할 수 있다 (데이터가 기본적으로 한 곳에만 있다)
// 유일하게 data를 바꾸는 곳 (어떻게?? => action을 통해서!)

// action은 redux에서 function을 부를 때 쓰는 두번째 파라미터(혹은 argument)
// const countModifier = (count = 0, action) => {
//   console.log(count, action)
//   if (action.type === "ADD"){
//    return count + 1
//   } else if(action.type === "MINUS") {
//     return count - 1;
//   } else {
//     return count
//   }
// }

// Action 객체의 type 값에 따라 분기하는 switch 조건문
  // 위 if문과 같은 동작을 한다
  // 훨씬 더 간결하게 코드를 작성할 수 있어 이 방법을 더 많이 씀 => 공식문서에도 이렇게

// 현재 action의 타입을 string 으로 사용하고 있는데, 오타와 같은 휴먼 에러를 방지하기 위해 변수를 사용할 수도 있다

const ADD = "ADD"
const MINUS = "MINUS"

const countModifier = (count = 0, action) => {
  // console.log(count, action)
  switch (action.type) {
    case ADD:
      return count + 1;

    case MINUS:
      return count - 1

    // 해당 되는 경우가 없을 땐 기존 상태를 그대로 리턴
    default:
      return count
  }
}

// data 저장소
// store를 만들면 => countModifier를 initial state로 불러옴
const countStore = createStore(countModifier)

console.log(countStore)
// 현재 store를 콘솔에 찍으면 나오는 데이터 중 subscribe는 store 안에 있는 변화들을 알 수 있게 해준다

// 해당 함수는 store에 변화가 있을 때마다 감지해서 호출됨
const onChange = () => {
  // console.log(countStore.getState())
  number.innerText = countStore.getState()
}

countStore.subscribe(onChange)
// 이후 버튼을 누르면 store에 변화가 생김

// reducer에 aciton을 보내는 방법 => store를 사용하는 방법
// dispatch()

// Error: Actions must be plain objects.(action은 plaingks object여야 한다

// 정리
// 1. 데이터를 수정하는 function은 reducer => reducer 밖에서 reducer와 커뮤니케이션
// 2. 커뮤니케이션을 하는 방법은 reducer에게 action 객체를 보낸다


// 1. Actipon 생성자 함수를 사용하는 방법
  // 보통 이 방법을 많이 사용한다
const handleAdd = () => {
  countStore.dispatch({ type:ADD})
}

add.addEventListener("click", handleAdd)

// 2. 익명 함수를 전달하는 방법
minus.addEventListener("click", () => countStore.dispatch({ type:MINUS}))