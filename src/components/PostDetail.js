import React from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../index.module.css";
import usePostDetail from "../app/hooks/usePostDetail";

function PostDetail() {
  const { postId } = useParams(); // Извлекаем значение параметра postId из текущего маршрута
  const { posts, loading, error } = usePostDetail(); // Используем кастомный хук для получения данных о постах

  if (loading) {
    // Если данные загружаются, отображаем прелоадер
    return (
      <div>
        <div className={styles.preloader}></div>
      </div>
    );
  }

  if (error) {
    // Если произошла ошибка при загрузке данных, отображаем сообщение об ошибке
    return <div>Произошла ошибка при загрузке данных: {error.message}</div>;
  }

  // Находим пост с соответствующим postId
  const post = posts.find((p) => p.id === parseInt(postId));

  if (!post) {
    // Если пост не найден, отображаем сообщение
    return <div>Пост не найден</div>;
  }

  // Отображаем информацию о посте
  return (
    <div className={styles.container}>
      <h1 className={styles.postsTitle}>Полная информация о посте</h1>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postDescription}>{post.body}</p>
      <Link to="/" className={styles.postBackButton}>
        Назад
      </Link>
    </div>
  );
}

export default PostDetail;
