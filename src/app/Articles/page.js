"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const page = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const res = await fetch("https://my-julien-strapi-project.onrender.com/api/Articles");
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
    return (
        <div className="p-8">
    {/* Titre principal */}
    <div className="p-8 max-w-screen-lg mx-auto">
      <h2 className="text-2xl text-[#e1650d] font-bold">
        Tous nos Articles
      </h2>
      <div className="w-16 sm:w-32 h-[5px] bg-[#e1650d] my-4"></div>
    </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => router.push(`/Article/${article.documentId}`)}
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

export default page;