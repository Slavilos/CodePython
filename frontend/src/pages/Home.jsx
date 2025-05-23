import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Ошибка при загрузке курсов:', err);
      }
    };

    fetchCourses();

    // Фейковые новости
    const fakeNews = [
      { title: "Новый курс по React!", description: "Освойте React за 2 недели." },
      { title: "Запущен курс по Node.js", description: "Углубленный курс по backend-разработке." },
      { title: "Платформа обновилась", description: "Добавлены новые возможности для обучения." }
    ];
    setNews(fakeNews);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Курсы</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold my-6">Новости</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
