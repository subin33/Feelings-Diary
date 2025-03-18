import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(()=> {
    // 다음과 같이 변수명에 $을 사용한 이유는 관례상 이변수 안에 DOM 요소가 저장 될 것이라는 뜻
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title;
  }, [title])
  // [title] -> 는 의존성 배열에 title이 포함도어, title 이 바뀔떄만 useEffect 내부 코드가 실행된다. 만약 [](빈 배열)로 설벙하면 useEffect는 컴포넌트가 처음 렌더링 될 때 한번만 실생되고, 이후 title 이 바뀌어도 반영되지 않는다. 
}

export default usePageTitle;