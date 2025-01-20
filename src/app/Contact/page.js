"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import CardAvis from "../componants/CardAvis";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSending(true);

    // Préparez les paramètres pour EmailJS
    const emailParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_name: "Vintage Automobiles",
    };

    // Utilisez votre Service ID, Template ID et clé publique EmailJS
    emailjs
      .send(
        "service_2ojtbaz", // Remplacez par votre Service ID
        "template_k330vid", // Remplacez par votre Template ID
        emailParams,
        "7e4R9dVa-AqMECe4k" // Remplacez par votre clé publique
      )
      .then(
        (response) => {
          console.log("Email envoyé avec succès :", response.status, response.text);
          setSuccess(true);
        },
        (err) => {
          console.error("Erreur lors de l'envoi de l'email :", err);
          setSuccess(false);
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <>
      <div>
        {/* Titre principal */}
        <div className="p-8 max-w-screen-lg mx-auto">
          <h2 className="text-2xl text-[#e1650d] font-bold">
            Contacter votre vendeur de voiture d'occasion
          </h2>
          <div className="w-16 sm:w-32 h-[5px] bg-[#e1650d] my-4"></div>
          <p>
            Une voiture vous intéresse ? Une demande de reprise ? Contactez-nous !
          </p>
        </div>

        {/* Conteneur principal */}
        <div className="flex flex-wrap justify-center items-start gap-4">
          {/* Section Adresse */}
          <div className="p-4 bg-gray-800 text-white rounded-lg max-w-sm w-full">
            <h3 className="text-2xl mb-2">Adresse</h3>
            <p>ZA de la Briqueterie, Voie D</p>
            <p>76160 Saint-Jacques-sur-Darnétal</p>
            <iframe
              title="Google Map"
              className="w-full h-52 mt-4 mb-4 rounded"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2594.3440149503595!2d1.1784625!3d49.440214700000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e0d9628715f981%3A0x57aa04dd5ddac8bb!2sVintage%20Automobiles%201856!5e0!3m2!1sfr!2sfr!4v1718260399158!5m2!1sfr!2sfr"
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
            <div className="h-px bg-white my-4"></div>
            <div>
              <h3 className="text-2xl mb-2">Téléphone</h3>
              <p>06.50.45.70.15</p>
            </div>
            <div className="h-px bg-white my-4"></div>
            <div>
              <h3 className="text-2xl mb-2">Nos horaires</h3>
              <p>Lundi : 14h à 19h</p>
              <p>Mardi au vendredi : 10h à 12h et 14h à 19h</p>
              <p>Samedi de 9h30 à 12h et 14h à 19h</p>
            </div>
          </div>

          {/* Section Formulaire */}
          <div className="w-full max-w-lg p-4 bg-gray-50 rounded-lg shadow-md">
            <div>
              <h3 className="text-2xl text-[#e1650d] font-bold mb-4">
                Envoyer un message
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Champs texte */}
              <div className="space-y-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Nom *"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1650d]"
                  required
                />
                <input
                  type="text"
                  id="phone"
                  placeholder="Téléphone *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1650d]"
                  required
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1650d]"
                  required
                />
              </div>

              {/* Zone de texte */}
              <div className="mt-4">
                <textarea
                  id="message"
                  placeholder="Message *"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-[#e1650d]"
                  required
                ></textarea>
              </div>

              {/* Bouton d'envoi */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-[#e1650d] transition-all"
                  disabled={isSending}
                >
                  {isSending ? "Envoi en cours..." : "Envoyer"}
                </button>
              </div>
            </form>
            {success === true && (
              <p className="text-green-500 mt-4">Email envoyé avec succès !</p>
            )}
            {success === false && (
              <p className="text-red-500 mt-4">
                Une erreur est survenue lors de l'envoi de l'email.
              </p>
            )}
          </div>
        </div>
      </div>

      <CardAvis />
    </>
  );
};

export default Contact;
