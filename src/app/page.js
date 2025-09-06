"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import photo from "../../public/images/groupVo.png";
import Boutton from "./componants/Boutton";
import Presentation from "./componants/Presentation";
import Articles from "./componants/Articles";
import FormContact from "./componants/FormContact";
import GoogleMap from "./componants/GoogleMaps";

/** Marquee vertical sans trou (2 copies qui se relaient) */
const VerticalMarqueeDual = ({ src, speed = 20, className = "" }) => {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  const y1 = useMotionValue(0);
  const y2 = useMotionValue(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const nh = el.clientHeight || 0;
      setH(nh);
      y1.set(0);
      y2.set(-nh);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [y1, y2]);

  useAnimationFrame((t, delta) => {
    if (!h) return;
    const dy = (speed * delta) / 1000; // px/s
    const n1 = y1.get() + dy;
    const n2 = y2.get() + dy;
    y1.set(n1 >= h ? n1 - 2 * h : n1);
    y2.set(n2 >= h ? n2 - 2 * h : n2);
  });

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      {/* copie 1 */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 will-change-transform transform-gpu">
        <Image src={src} alt="bande 1" fill priority className="object-cover" sizes="100vw" />
      </motion.div>
      {/* copie 2 */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 z-0 will-change-transform transform-gpu">
        <Image src={src} alt="bande 2" fill priority className="object-cover" sizes="100vw" />
      </motion.div>
    </div>
  );
};

export default function Home() {
  const leboncoin = () => {
    window.open(
      "https://www.leboncoin.fr/boutique/118127/vintage_automobiles_1856.htm",
      "_blank"
    );
  };

  return (
    <>
{/* SECTION HERO */}
<div className="relative h-[95vh] w-full flex flex-col lg:flex-row overflow-hidden bg-black">
{/* TEXTE + BOUTON */}
<div className="relative z-20 h-full w-full flex flex-col justify-center items-center lg:items-start lg:ml-[10%]">

  {/* --- Variante MOBILE : avec overlay --- */}
  <div className="block lg:hidden w-[90%]">
    <div className="bg-black/60 rounded-xl px-6 py-6">
      <h2 className="text-3xl font-bold mb-4 text-white">Notre boutique</h2>
      <p className="text-sm text-white">Retrouvez tous nos véhicules sur LeBoncoin !</p>
      <div className="flex justify-center mt-4">
        <Boutton
          className="inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-white bg-[#e1650d] rounded-lg hover:bg-[#d1540b] transition-all duration-300"
          title="Visiter Boutique"
          onClick={leboncoin}
        />
      </div>
    </div>
  </div>

  {/* --- Variante DESKTOP : sans overlay --- */}
  <div className="hidden lg:block">
    <h2 className="lg:text-[7vh] font-bold mb-4 text-white">Notre boutique</h2>
    <p className="lg:text-base text-white">Retrouvez tous nos véhicules sur LeBoncoin !</p>
    <div className="mt-4">
      <Boutton
        className="inline-flex items-center justify-center px-5 py-2 lg:text-lg font-bold text-white bg-[#e1650d] rounded-lg hover:bg-[#d1540b] transition-all duration-300"
        title="Visiter Boutique"
        onClick={leboncoin}
      />
    </div>
  </div>

</div>




  {/* BANDE ANIMÉE — mobile: fond plein écran derrière le texte / desktop: colonne droite */}
  <div className="absolute inset-0 z-0 lg:static lg:z-0 block h-full w-full lg:w-1/2 mt-0 lg:mt-0 bg-black">
    <VerticalMarqueeDual src={photo} speed={20} className="h-full w-full" />
  </div>
</div>



      {/* autres composants */}
      <Presentation />
      {/* <Articles /> */}
      <FormContact />
      <GoogleMap />
    </>
  );
}
