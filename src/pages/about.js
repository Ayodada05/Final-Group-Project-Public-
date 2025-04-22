import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../components/navbar"));
const Footer = dynamic(() => import("./footer"));

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <section>
          <h2>Our Mission</h2>
          <p>
            Recipe Finder is designed to help you explore new recipes with the
            ingredients you already have in your kitchen. We believe cooking
            should be easy, fun, and delicious, and we’re here to help you make
            the most out of what you already have!
          </p>
        </section>

        <section>
          <h2>How It Works</h2>
          <p>
            Simply enter the ingredients you have on hand, and we’ll provide you
            with a list of recipes you can make! You can also save your favorite
            recipes for later use and track your culinary adventures.
          </p>
        </section>

        <section>
          <h2>Get in Touch</h2>
          <p>
            If you have any questions or suggestions, feel free to contact us
            via email or follow us on social media for updates.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
