import { Spin } from "antd";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./navigation/RouterConfig";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[100vh]">
          <Spin />
        </div>
      }
    >
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
