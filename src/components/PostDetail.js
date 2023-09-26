import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetPostsQuery } from "../app/services/api";
import styles from "../index.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.postsTitle}>Полная информация о посте</h1>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postDescription}>{post.body}</p>
      <Link to="/" className={styles.postBackButton}>Назад</Link>
    </div>
  );
}

export default PostDetail;
