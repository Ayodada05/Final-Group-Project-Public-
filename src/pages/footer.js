import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 recipe finder. All rights reserved.</p>
      <div className="footer-links">
        <Link href="#privacy-policy"
         className="footer-link">Privacy Policy
        </Link>
        <span> | </span>
        <Link href="#terms-of-service"
          className="footer-link">Terms of Service
        </Link>
        <span> | </span>
        <Link href="#contact-us"
         className="footer-link">Contact Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
