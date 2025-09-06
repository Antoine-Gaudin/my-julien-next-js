"use client";

import React from "react";
import Boutton from "./Boutton";
import DataAvis from "../data/DataAvis"; // ⚠️ ajuste le chemin si besoin

const CardAvis = () => {
  const avisData = DataAvis;

  const GoogleAvis = () => {
    window.open(
      "https://www.google.com/search?q=vintage+automobiles+1856",
      "_blank"
    );
  };

  if (!avisData || !avisData.length) {
    return <p className="text-gray-500">Aucun avis pour le moment.</p>;
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

      {/* Liste des avis */}
      <div className="space-y-8">
        {avisData.map((item) => {
          const { id, name, nameTag, note, Avis } = item;
          const rating = Array.isArray(note) && note.length > 0 ? note[0] : 0;

          return (
            <div
              key={id}
              className="w-full sm:w-3/4 lg:w-[120vh] mx-auto p-6 border-t-[3px] border-black"
            >
              <div className="flex items-center space-x-4">
                {/* Profil cercle */}
                <span className="w-12 h-12 sm:w-16 sm:h-16 bg-[#e1650d] rounded-full text-white text-center leading-[3rem] sm:leading-[4rem] text-lg sm:text-xl">
                  {nameTag}
                </span>
                {/* Nom */}
                <span className="text-xl sm:text-2xl font-bold">{name}</span>
              </div>

              {/* Étoiles */}
              <div className="my-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <i
                    key={idx}
                    className={`${
                      idx < rating ? "fas fa-star" : "far fa-star"
                    } text-yellow-500`}
                  ></i>
                ))}
              </div>

              {/* Texte de l'avis */}
              <p className="text-gray-800">{Avis}</p>
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
