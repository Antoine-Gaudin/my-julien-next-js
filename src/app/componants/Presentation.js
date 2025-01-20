"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/Presentation.module.css"; // Import du CSS Module

const Presentation = () => {
  const [presentations, setPresentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPresentations = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/presentations");
        if (!res.ok) {
          throw new Error("Failed to fetch presentations");
        }
        const data = await res.json();
        setPresentations(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPresentations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
