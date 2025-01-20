"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation"; // Pour récupérer l'ID de l'article
const ArticlePage = () => {
  const [article, setArticle] = useState(null); // Stocke l'article récupéré
  const [articlesSimilaires, setArticlesSimilaires] = useState([]); // Articles similaires
  const [error, setError] = useState(""); // Gère les erreurs
  const { documentid } = useParams(); // Récupère l'ID de l'article depuis l'URL

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Récupérer l'article actuel
        const responseArticle = await axios.get(`http://localhost:1337/api/articles/${documentid}`);
        setArticle(responseArticle.data.data);
        console.log("Article reçu :", responseArticle.data.data);

        // Récupérer tous les articles, exclure celui en cours
        const responseArticles = await axios.get("http://localhost:1337/api/articles");
        const articlesExclusProduitActuel = responseArticles.data.data.filter(
          (prod) => prod.id !== documentid // Exclut l'article actuel
        );

        // Mélanger les articles pour en tirer 3 aléatoires
        const articlesMeles = articlesExclusProduitActuel.sort(() => Math.random() - 0.5);
        const articlesAleatoires = articlesMeles.slice(0, 3);

        setArticlesSimilaires(articlesAleatoires);
      } catch (err) {
        console.error("Erreur lors du chargement de l'article :", err);
        setError("Impossible de charger l'article.");
      }
    };

    // Appel de la fonction pour récupérer les détails de l'article
    fetchArticle();
  }, [documentid]);

  // Affichage en cas d'erreur ou de chargement
  if (error) {
    console.log("Erreur:", error);
    return <p className="text-red-500">{error}</p>;
  }
  
  if (!article) {
    console.log("Chargement de l'article...");
    return <p>Chargement de l'article...</p>;
  }

  console.log("Affichage de l'article :", article);

  return (
    <div>
    {/* Hero header avec effet parallax */}
    <div
      className="relative w-full h-[35rem] bg-cover bg-center"
      style={{
        backgroundImage: `url(${article.urlphoto})`,
        backgroundAttachment: "fixed", // Effet Parallax
      }}
    ></div>
  
    {/* Zone de contenu et articles similaires */}
    <div className="relative m-4 z-10 mt-[calc(-10%-17.5rem)] mx-auto max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Partie gauche : Détails de l'article */}
        <div className="flex-1">
          {/* Contenu de l'article */}
          <div
            className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }} // Fond blanc avec opacité
          >
            {/* Titre centré et travaillé */}
            <div className="mb-6 text-center">
              <h1 className="text-4xl font-bold">{article.title}</h1>
            </div>
            
            {/* Contenu de l'article */}
            {article.content && article.content.length > 0 ? (
              article.content.map((block, index) => {
                const contentText =
                  block.children && block.children.length > 0
                    ? block.children[0]?.text
                    : " ";
  
                return (
                  <div key={index} className="mb-4">
                    {/* Affichage du texte avec justification */}
                    <div className="text-justify">{contentText}</div>
                  </div>
                );
              })
            ) : (
              <p>Aucun contenu disponible pour cet article.</p>
            )}
          </div>
        </div>
  
        {/* Partie droite : Articles similaires */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Articles similaires</h3>
          <div className="flex flex-col space-y-4">
            {articlesSimilaires.map((articleSimilaire) => (
              <div
                key={articleSimilaire.id}
                className="flex items-center p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)", // Fond blanc avec opacité
                  maxWidth: "450px", // Fixe la largeur des cartes articles similaires à 450px
                  marginBottom: "20px",
                }}
                onClick={() => window.location.href = `/Article/${articleSimilaire.documentId}`} // Redirection vers l'article
              >
                <img
                  src={articleSimilaire.urlphoto}
                  alt={articleSimilaire.title}
                  className="w-40 h-40 object-cover mr-4 rounded-lg"
                />
                <div>
                  <h4 className="font-semibold">{articleSimilaire.title}</h4>
                  <p>{articleSimilaire.description.slice(0, 50)}{articleSimilaire.description.length > 50 && '...'}</p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
  
};

export default ArticlePage;
