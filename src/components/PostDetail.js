import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetPostsQuery } from "../app/services/api";

function PostDetail() {
  const { postId } = useParams();
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Произошла ошибка при загрузке данных.</div>;
  }

  const post = posts.find((p) => p.id === parseInt(postId));

  if (!post) {
    return <div>Пост не найден</div>;
  }

  return (
    <div>
      <h1>Полная информация о посте</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/">Назад</Link>
    </div>
  );
}

export default PostDetail;
