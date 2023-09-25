import React from "react";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../app/services/api";

function PostList() {
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Произошла ошибка при загрузке данных.</div>;
  }

  return (
    <div>
      <h1>Список постов</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.slice(0, 100)}...</p>
            <Link to={`/post/${post.id}`}>Просмотр</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
