import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#8f0d0d",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            marginLeft: "0.75rem",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.3rem",
          }}
        >
          Recipe Finder
        </span>
      </div>

      {/* Navigation Links on the Right */}
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link
          href="/"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
        >
          Home
        </Link>
        <Link
          href="/recipes"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
        >
          Recipes
        </Link>
        <Link
          href="/favorites"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
        >
          Favorites
        </Link>
        <Link
          href="/about"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
