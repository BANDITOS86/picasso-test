import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
