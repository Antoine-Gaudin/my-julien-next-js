"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../styles/Navigation.module.css";

const Navigation = () => {
  const [isSticky, setIsSticky] = useState(false);
  const menuRef = useRef(null);
  const topElementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: [0] }
    );

    if (menuRef.current && topElementRef.current) {
      observer.observe(topElementRef.current);
    }

    return () => {
      if (menuRef.current && topElementRef.current) {
        observer.unobserve(topElementRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.navigation} ref={topElementRef}>
      <ul
        className={`${styles.navigation} ${
          isSticky ? styles.sticky : ""
        }`}
        ref={menuRef}
      >
        <li>
          <Link href="/" className={styles.link}>
            <span>Accueil</span>
          </Link>
        </li>
        <li>
          <Link href="/Contact" className={styles.link}>
            <span>Contact</span>
          </Link>
        </li>
        <li>
          <Link href="/Articles" className={styles.link}>
            <span>Articles</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
