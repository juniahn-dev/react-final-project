import "./styles/global.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Order from "./pages/Order";

export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="order/:id" element={<Order />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
