import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import NotFoundPage from "./Components/Search/NotFoundPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  </BrowserRouter>
);
