import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function usePostList() {
  // Состояния для хранения данных о постах, статуса загрузки и ошибки
  const [posts, setPosts] = useState([]); // Хранит данные о постах
  const [loading, setLoading] = useState(true); // Хранит состояние загрузки
  const [error, setError] = useState(null); // Хранит ошибку, если она возникла

  // Используем useEffect для выполнения запроса данных о постах
  useEffect(() => {
    // Используем функцию fetch для выполнения HTTP-запроса
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json()) // Преобразуем ответ в формат JSON
      .then((data) => {
        setPosts(data); // Обновляем состояние данных о постах
        setLoading(false); // Устанавливаем состояние загрузки как завершенное
      })
      .catch((error) => {
        setError(error); // Обрабатываем ошибку и сохраняем её в состоянии
        setLoading(false); // Устанавливаем состояние загрузки как завершенное

        // Используйте toast.error для отображения ошибки
        toast.error("Произошла ошибка при загрузке данных: " + error.message);
      });
  }, []); // Пустой массив зависимостей означает, что эффект выполняется только при монтировании компонента

  // Возвращаем объект, содержащий данные о постах, состояние загрузки и ошибку
  return { posts, loading, error };
}

export default usePostList; // Экспортируем кастомный хук для дальнейшего использования в компонентах
