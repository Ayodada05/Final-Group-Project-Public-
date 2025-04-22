import dynamic from "next/dynamic";
import Link from "next/link";

const Navbar = dynamic(() => import("../components/navbar"));
const Footer = dynamic(() => import("./footer"));

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome to Recipe Finder 🍳</h1>
        <p>
          Discover amazing meals using the ingredients already in your kitchen!
        </p>

        <section>
          <h2>How It Works</h2>
          <ul>
            <li>Type the ingredients you have (e.g. chicken, tomato, onion)</li>
            <li>We’ll find recipes that match your ingredients</li>
            <li>Save your favorites to try later!</li>
          </ul>
        </section>

        <section>
          <h2>Quick Links</h2>
          <ul>
            <li>
              <Link href="/recipes">🔍 Search Recipes</Link>
            </li>
            <li>
              <Link href="/favorites">❤️ View Favorites</Link>
            </li>
          </ul>
        </section>

        <section>
          <h2>Why Use Recipe Finder?</h2>
          <ul>
            <li>✅ No need to waste food – use what you have</li>
            <li>✅ Easy cooking ideas for busy days</li>
            <li>✅ Save recipes and build your personal cookbook</li>
          </ul>
        </section>

        <p className="quote">"Cooking is love made visible." – Riley</p>
      </div>
      <Footer />
    </div>
  );
}
