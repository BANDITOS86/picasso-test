import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify"; // Импортируйте toast

function usePostList() {
  // Состояния для хранения данных о постах, статусе загрузки, текущей странице и ошибке
  const [posts, setPosts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false); 

  // Состояние для отслеживания времени отображения лоадера
  const [showLoader, setShowLoader] = useState(false);

  // Ref для отслеживания нижней границы списка
  const bottomOfListRef = useRef(null);

  useEffect(() => {
    const bottomOfList = bottomOfListRef.current;

    // Функция, выполняющая загрузку дополнительных постов при достижении нижней границы
    const loadMorePosts = () => {
      // Проверяем, что есть ещё посты для загрузки и не выполняется другая загрузка и не произошла ошибка
      if (hasMorePosts && !loadingMore && !errorOccurred) {
        setLoadingMore(true);

        // Устанавливаем флаг для отображения лоадера
        setShowLoader(true);

        // Отображаем лоадер минимум через 1 секунду
        setTimeout(() => {
          // Запрашиваем дополнительные посты с сервера
          fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${
              page + 1
            }&_limit=10`
          )
            .then((response) => response.json())
            .then((newPosts) => {
              if (newPosts.length === 0) {
                // Если новых постов нет, устанавливаем флаг hasMorePosts в false
                setHasMorePosts(false);
              } else {
                // Обновляем состояние постов, добавляя новые посты к текущим
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                setPage(page + 1);
              }
              setLoadingMore(false);
              // Скрываем лоадер после завершения загрузки
              setShowLoader(false);
            })
            .catch((error) => {
              console.error("Произошла ошибка при загрузке данных:", error);
              setLoadingMore(false);

              // toast.error для отображения ошибки
              toast.error(
                "Произошла ошибка при загрузке данных: " + error.message
              );

              // Устаноавливаем флаг ошибки
              setErrorOccurred(true);
              // Скрываем лоадер после ошибки
              setShowLoader(false);
            });
        }, 1000); // Показываем лоадер минимум через 1 секунду
      }
    };

    // Создаём IntersectionObserver для отслеживания видимости нижней границы списка
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMorePosts) {
          loadMorePosts();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    // Если есть нижняя граница списка и есть ещё посты для загрузки, начинаем наблюдение
    if (bottomOfList && hasMorePosts && !errorOccurred) {
      observer.observe(bottomOfList);
    }

    // Функция для отмены наблюдения при размонтировании компонента
    return () => {
      if (bottomOfList && !errorOccurred) {
        observer.unobserve(bottomOfList);
      }
    };
  }, [loadingMore, page, hasMorePosts, errorOccurred]);

  // Возвращаем данные и функции для использования в компоненте
  return { posts, loadingMore, bottomOfListRef, showLoader };
}

export default usePostList;
