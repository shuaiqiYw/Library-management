import { useRoutes } from "react-router-dom" 
import route from "./router/index"

function App() {
  let router = useRoutes(route)
  return (
    <div className="App">
      {router}
    </div>
  );
}

export default App;
