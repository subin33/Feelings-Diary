import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const {onCreate} = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.content
    );

    // 작성이 완료되면, home 페이지로 이동하고, 이둥 후에는 replace:true 로 뒤로가기를 방지 
    nav("/",{replace:true})
  }
  return (
  <div>
    <Header 
      title={"새 일기 쓰기"}
      leftChild={<Button onClick={() => nav(-1)}
         text={"< 뒤로가기"} />}
      />
      <Editor onSubmit={onSubmit} />
  </div>
)
};

export default New;