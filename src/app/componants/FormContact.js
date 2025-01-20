
      
      "use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import styles from "../styles/FormContact.module.css"; // Import du CSS Module

const ContactForm = () => {
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

    // Préparez les données à envoyer
    const emailParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_name: "Vintage Automobiles",
    };

    // Utilisez votre Service ID, Template ID et Public Key
    emailjs
      .send(
        "service_2ojtbaz", // Remplacez par votre Service ID
        "template_k330vid", // Remplacez par votre Template ID
        emailParams,
        "7e4R9dVa-AqMECe4k" // Remplacez par votre clé publique EmailJS
      )
      .then(
        (response) => {
          console.log("Email envoyé avec succès :", response.status, response.text);
          setSuccess(true);
        },
        (err) => {
          console.error("Erreur lors de l'envoi de l'email :", err);
          setSuccess(false);
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="bg-[#333]">
      <div className={styles.containerForm}>
        <div className={styles.containerTitle}>
          <h2>Prendre Contact</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.firstDiv}>
            <div>
              <input
                type="text"
                className={styles.inputCase}
                id="name"
                placeholder="Nom *"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className={styles.inputCase}
                id="phone"
                placeholder="Téléphone *"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                className={styles.inputCase}
                id="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <textarea
              id="message"
              placeholder="Message *"
              className={`${styles.inputCase} ${styles.textareaForm}`}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className={styles.submitBtn}
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
  );
};

export default ContactForm;
