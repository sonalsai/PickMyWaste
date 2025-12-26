import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import LogoIcon from "../../assets/images/logo-icon.svg";
import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Determine page type based on current route
  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Only detect active section on home page
      if (!isHomePage) return;

      // Get all sections
      const sections = ["home", "about", "how-it-works", "pricing", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      // Find which section is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "How It Works", href: "#how-it-works", id: "how-it-works" },
    { name: "Pricing", href: "#pricing", id: "pricing" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      // If not on home page, navigate to home first
      if (!isHomePage) {
        navigate("/");
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setIsMobileMenuOpen(false);
    } else {
      navigate(href);
      setIsMobileMenuOpen(false);
    }
  };

  // Determine button text and link based on current page
  const getButtonConfig = () => {
    if (isLoginPage) {
      return { text: "Register", link: "/register" };
    } else if (isRegisterPage) {
      return { text: "Login", link: "/login" };
    } else {
      // Home page
      return { text: "Book Pickup", link: "/register" };
    }
  };

  const buttonConfig = getButtonConfig();
  const showNavLinks = isHomePage;
  const showLoginButton = isHomePage;

  return (
    <header
      className={`app-navbar ${isScrolled ? "app-navbar--scrolled" : ""}`}
      style={{ position: isHomePage ? "fixed" : "sticky" }}
    >
      <div className="navbar-content">
        <div
          className="logo-section"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={LogoIcon} alt="Pick My Waste" className="logo-icon" />
          <span className="brand-name">Pick My Waste</span>
        </div>

        {/* Desktop Navigation - Only show on home page */}
        {showNavLinks && (
          <nav className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={activeSection === link.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}

        {/* Desktop Actions */}
        <div className="actions">
          {showLoginButton && (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
          <button
            className="register-btn"
            onClick={() => navigate(buttonConfig.link)}
          >
            <span className="btn-text">{buttonConfig.text}</span>
            <span className="btn-arrow">{buttonConfig.text} &rarr;</span>
          </button>

          {/* Mobile Menu Toggle - Only show on home page */}
          {showNavLinks && (
            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu - Only show on home page */}
      {showNavLinks && isMobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={activeSection === link.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mobile-actions">
            {showLoginButton && (
              <button
                className="mobile-login-btn"
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
              >
                Login
              </button>
            )}
            <button
              className="mobile-register-btn"
              onClick={() => {
                navigate(buttonConfig.link);
                setIsMobileMenuOpen(false);
              }}
            >
              {buttonConfig.text}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
