import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

function useFetchPosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const observer = useRef();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=10`
      );
      setPosts((prevPosts) => [...prevPosts, ...res.data]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, []);

 const handleObserver = useCallback(
   (entries) => {
     const target = entries[0];
     if (target && target.isIntersecting) {
       fetchPosts();
     }
   },
   [fetchPosts]
 );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });
    if (observer.current) {
      observer.current.observe(document.querySelector(".loader"));
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [handleObserver]);

  return { loading, error, posts };
}

export default useFetchPosts;
