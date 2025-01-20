"use client";

import React from "react";
import Image from "next/image";
import vintage from "../../../public/images/shortlogoVA.png";

const NameTag = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center mt-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          <span translate="no">Vintage Automobile 1856</span>
        </h1>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-6">
        <Image
          src={vintage}
          alt="Vintage Logo"
          className="rounded-[15px] border border-white"
          width={100} // Largeur personnalisée pour les petits écrans
          height={100} // Hauteur personnalisée pour les petits écrans
          priority={true} // Chargement prioritaire
        />
      </div>
    </div>
  );
};

export default NameTag;
