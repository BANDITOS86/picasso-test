import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Создаем корневой React-компонент с помощью ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Рендерим корневой компонент приложения внутри React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Вызываем функцию reportWebVitals для отчета о веб-производительности
reportWebVitals();
