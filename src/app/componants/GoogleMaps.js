"use client";

import React from "react";

const GoogleMap = () => {
  return (
    <div style={{ width: "100%", height: "500px", overflow: "hidden" }}>
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2594.3440149503595!2d1.1784625!3d49.440214700000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e0d9628715f981%3A0x57aa04dd5ddac8bb!2sVintage%20Automobiles%201856!5e0!3m2!1sfr!2sfr!4v1718260399158!5m2!1sfr!2sfr"
        allowFullScreen
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
