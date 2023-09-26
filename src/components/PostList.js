import React from "react";
import { Link } from "react-router-dom";
import styles from "../index.module.css";
import usePostList from "../app/hooks/usePostList";

function PostList() {
  // Используем custom hook для получения данных
  const { posts, loadingMore, bottomOfListRef } = usePostList();

  return (
    <div className={styles.container}>
      <h1 className={styles.postsTitle}>Список постов</h1>
      <ul className={`${styles.listReset} ${styles.postsList}`}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postsItem}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postDescription}>
              {post.body.slice(0, 90)}...
            </p>
            <Link to={`/post/${post.id}`} className={styles.postViewButton}>
              Просмотр
            </Link>
          </li>
        ))}
      </ul>

      {loadingMore && (
        <div>
          <div className={styles.preloader}></div>
        </div>
      )}
      <div ref={bottomOfListRef}></div>
    </div>
  );
}

export default PostList;
