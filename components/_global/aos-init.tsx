"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AOSInitialize = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      delay: 50,
      once: true,
      easing: "ease-out-back",
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default AOSInitialize;
