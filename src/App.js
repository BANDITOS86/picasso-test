import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return (
    <Router>
      {/* ToastContainer - отображение контейнера для уведомлений */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PostList />} />{" "}
        {/* Маршрут для отображения списка постов */}
        <Route path="/post/:postId" element={<PostDetail />} />{" "}
        {/* Маршрут для отображения деталей поста */}
      </Routes>
    </Router>
  );
}

export default App;
