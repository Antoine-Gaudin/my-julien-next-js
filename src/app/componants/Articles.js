"use client";

import React, { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/Articles");
        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await res.json();

        // Mélanger aléatoirement les articles
        const shuffledArticles = data.data.sort(() => 0.5 - Math.random());

        // Limiter à 4 articles maximum
        setArticles(shuffledArticles.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Condition : si moins de 4 articles, on n'affiche rien
  if (articles.length < 4) {
    return null;
  }

  return (
    <div className="bg-[#e1650d] text-white p-8">
      <h2 className="text-3xl font-bold mb-6">Nos Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
          >
            {article.urlphoto && (
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${article.urlphoto}')`,
                }}
              ></div>
            )}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-gray-900 opacity-90 px-4 py-2">
              <p className="font-bold text-lg text-white">
                {article.title || "Titre non disponible"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
