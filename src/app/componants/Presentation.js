"use client";

import React from "react";
import styles from "../styles/Presentation.module.css"; // Import du CSS Module
import DataText from "../data/datatext"; // <-- adapte le chemin si besoin

const Presentation = () => {
  const presentations = DataText; // tableau [{ id, title, text }]

  return (
    <div>
      {presentations.map((item) => (
        <div className={styles.contenu} key={item.id}>
          <div className="item">
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Presentation;
