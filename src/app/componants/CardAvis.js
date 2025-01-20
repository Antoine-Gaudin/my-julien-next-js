"use client";

import React, { useEffect, useState } from "react";
import Boutton from "./Boutton";

const CardAvis = () => {
  const [avisData, setAvisData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/avisgoogles");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des avis");
        }
        const result = await response.json();
        console.log("Données reçues depuis Strapi :", result.data);
        setAvisData(result.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des avis :", err);
        setError(err.message);
      }
    };

    fetchAvis();
  }, []);

  const GoogleAvis = () => {
    window.open(
      "https://www.google.com/search?q=vintage+automobiles+1856",
      "_blank"
    );
  };

  if (error) {
    return <p className="text-red-500">Erreur : {error}</p>;
  }

  if (!avisData.length) {
    return <p className="text-gray-500">Chargement des avis...</p>;
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      {/* Titre */}
      <div className="w-full mt-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#e1650d]">
          Pas convaincu ? Quelques avis pour vous encourager
        </h2>
        <div className="w-16 sm:w-32 h-[5px] bg-[#e1650d] my-4"></div>
      </div>

      {/* Avis List */}
      <div className="space-y-8">
        {avisData.map((item) => {
          const { id, name, nametag, note, avis } = item;
          return (
            <div
              key={id}
              className="w-full sm:w-3/4 lg:w-[120vh] mx-auto p-6 border-t-[3px] border-black"
            >
              <div className="flex items-center space-x-4">
                {/* Profil cercle */}
                <span className="w-12 h-12 sm:w-16 sm:h-16 bg-[#e1650d] rounded-full text-white text-center leading-[3rem] sm:leading-[4rem] text-lg sm:text-xl">
                  {nametag}
                </span>
                {/* Nom */}
                <span className="text-xl sm:text-2xl font-bold">{name}</span>
              </div>
              {/* Stars */}
              <div className="my-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <i
                    key={index}
                    className={`${
                      index < note ? "fas fa-star" : "far fa-star"
                    } text-yellow-500`}
                  ></i>
                ))}
              </div>
              {/* Texte de l'avis */}
              <p className="text-gray-800">{avis}</p>
            </div>
          );
        })}
      </div>

      {/* Bouton Avis Google */}
      <div className="flex justify-center items-center w-full mt-10">
        <Boutton
          className="hover:scale-105 transition-transform"
          title="Avis Google"
          onClick={GoogleAvis}
        />
      </div>
    </div>
  );
};

export default CardAvis;
