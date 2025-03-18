import './App.css'
import { createContext, useEffect, useReducer, useRef, useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import Diary from './pages/Diary'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'



function reducer(state, action){
  let nextState;
  switch(action.type){
    case 'INIT' : return action.data; 
    case 'CREATE':{
      nextState =[action.data, ...state];
      break;
    };
    case 'UPDATE': {
      nextState = state.map((item) => 
      String(item.id) === String(action.data.id) ? action.data : item
    )
    break;
    }
    case "DELETE":{
      nextState = state.filter((item) => String(item.id) !== String(action.id)
    )
    break;
    }
    default: return state
  }

  localStorage.setItem("diary",JSON.stringify(nextState))
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// JSON.stringify -> 문자열로 변경 
// JSON.parse -> 객체로 변경 
// JSON.parse 를 사용할때, 값이 undefined나 null 이면 오류를 발생한다. 그래서 이점을 유의해서 사용해야한다. 

// localStorage.setItem('person',JSON.stringify({name:"ddd"}))

// console.log(JSON.parse(localStorage.getItem("person")))
function App() {
  // 로딩 상태를 보관하는 state 
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if(!storedData){
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);
    // Array.isArray -> 배열이라면 true 아니라면 false
    if(!Array.isArray(parsedData)){
      setIsLoading(false);
      return;
    }
    let maxId = 0; 
    parsedData.forEach((item) => {
      if(Number(item.id) > maxId) {
        maxId = Number(item.id)
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type:"INIT",
      data:parsedData
    })
    setIsLoading(false);
  },[])
  // 새로운 일기 추가 
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type:"CREATE",
      data :{
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    })
  }

  // 기존 일기 수정 
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch(
      {
        type:"UPDATE",
        data:{
          id, 
          createdDate, 
          emotionId,
          content,
        }
      }
    )
  }


  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch ({
      type:"DELETE",
      id
    })
  }

  if(isLoading){
    return <div>데이터 로딩중입니다...</div>
  }
  return (
    <>
 
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate,
        onUpdate,
        onDelete
      }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/diary/:id' element={<Diary />} />
          <Route path='/edit/:id' element={<Edit />}/>
          <Route path='*' element={<Notfound />} />
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
    </>
  )
}

export default App
