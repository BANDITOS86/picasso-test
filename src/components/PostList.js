import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
      {/* {!hasMorePosts && <div>Посты закончились</div>} */}
      {loadingMore && <div>Загрузка...</div>}
      <div ref={bottomOfListRef}></div>
    </div>
  );
}

export default PostList;
