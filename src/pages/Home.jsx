import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [params, setParams] = useSearchParams();

  console.log('params',params.get("value"))
  console.log('setParams',setParams)
  return <div>Home</div>
};

export default Home;