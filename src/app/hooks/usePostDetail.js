import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function usePostList() {
  // Состояния для хранения данных о постах, статуса загрузки и ошибки
  const [posts, setPosts] = useState([]); // Хранит данные о постах
  const [loading, setLoading] = useState(true); // Хранит состояние загрузки
  const [error, setError] = useState(null); // Хранит ошибку, если она возникла

  // Используем useEffect для выполнения запроса данных о постах
  useEffect(() => {
    // Выполняем HTTP-запрос с использованием Axios
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const data = response.data; // Получаем данные из ответа
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
