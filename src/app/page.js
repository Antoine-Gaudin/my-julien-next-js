"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import photo from "../../public/images/groupVo.png";
import Boutton from "./componants/Boutton";
import Presentation from "./componants/Presentation";
import Articles from "./componants/Articles";
import FormContact from "./componants/FormContact";
import GoogleMap from "./componants/GoogleMaps";

export default function Home() {
  const leboncoin = () => {
    window.open(
      "https://www.leboncoin.fr/boutique/118127/vintage_automobiles_1856.htm",
      "_blank"
    );
  };

  return (
    <>
      <div className="bg-black overflow-hidden h-[95vh] w-full flex flex-col lg:flex-row">
        {/* Texte et bouton */}
        <div className="h-full w-full text-white flex flex-col justify-center items-center lg:items-start lg:ml-[10%]">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-[7vh] font-bold mb-4">Notre boutique</h2>
            <p className="text-sm lg:text-base">Retrouvez tous nos véhicules sur LeBoncoin !</p>
            <div className="flex justify-center mt-4">
              <Boutton
                className="inline-flex items-center justify-center px-5 py-2 text-sm lg:text-lg font-bold text-white bg-[#e1650d] rounded-lg hover:bg-[#d1540b] transition-all duration-300"
                title="Visiter Boutique"
                onClick={leboncoin}
              />
            </div>
          </div>
        </div>

        <motion.div className="hidden lg:block h-64 w-full lg:h-full lg:w-1/2 mt-4 lg:mt-0 overflow-hidden relative">
  {/* Première image */}
  <motion.div
    initial={{ y: "-100%" }}
    animate={{ y: "100%" }}
    transition={{
      duration: 40,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute top-0 left-0 w-full h-full"
  >
    <Image
      src={photo}
      alt="Group of vehicles"
      priority
      className="w-full h-full object-cover"
    />
  </motion.div>

  {/* Deuxième image */}
  <motion.div
    initial={{ y: "0px"}} // Commence directement à 0%
    animate={{ y: "200%" }} // Descend complètement
    transition={{
      duration: 40,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute top-[-100%] left-0 w-full h-full"
  >
    <Image
      src={photo}
      alt="Group of vehicles duplicate"
      priority
      className="w-full h-full object-cover"
    />
  </motion.div>
</motion.div>

      </div>

      {/* Autres composants */}
      <Presentation />
      <Articles />
      <FormContact />
      <GoogleMap />
    </>
  );
}