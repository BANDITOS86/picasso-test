import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../index.module.css";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const bottomOfListRef = useRef(null);

  useEffect(() => {
    const bottomOfList = bottomOfListRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMorePosts) {
          if (!loadingMore) {
            setLoadingMore(true);

            fetch(
              `https://jsonplaceholder.typicode.com/posts?_page=${
                page + 1
              }&_limit=10`
            )
              .then((response) => response.json())
              .then((newPosts) => {
                if (newPosts.length === 0) {
                  // Если нет новых постов, устанавливаем флаг hasMorePosts в false
                  setHasMorePosts(false);
                } else {
                  // Обновление состояния постов, добавляя новые посты к текущим
                  setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                  setPage(page + 1);
                }
                setLoadingMore(false);
              })
              .catch((error) => {
                alert('"Произошла ошибка при загрузке данных:", error');
                console.error("Произошла ошибка при загрузке данных:", error);
                setLoadingMore(false);
              });
          }
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (bottomOfList && hasMorePosts) {
      observer.observe(bottomOfList);
    }

    return () => {
      if (bottomOfList) {
        observer.unobserve(bottomOfList);
      }
    };
  }, [loadingMore, page, hasMorePosts]);

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

      {loadingMore && <div>Загрузка...</div>}
      <div ref={bottomOfListRef}></div>
    </div>
  );
}

export default PostList;
