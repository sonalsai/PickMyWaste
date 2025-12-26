import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../../../../assets/images/logo-icon.svg";
import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
    product: [
      { name: "How It Works", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
      { name: "About Us", href: "#about" },
    ],
    support: [
      { name: "Contact Us", href: "#contact" },
      { name: "FAQ", href: "#" },
      { name: "Help Center", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: <FiTwitter />, href: "#", label: "Twitter" },
    { icon: <FiFacebook />, href: "#", label: "Facebook" },
    { icon: <FiInstagram />, href: "#", label: "Instagram" },
    { icon: <FiLinkedin />, href: "#", label: "LinkedIn" },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={LogoIcon} alt="Pick My Waste" width="32" height="32" />
              <span className="footer__logo-text">Pick My Waste</span>
            </div>
            <p className="footer__tagline">
              Making waste management simple, transparent, and eco-friendly.
            </p>
            <div className="footer__social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="footer__social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__link-group">
              <h3 className="footer__link-title">Product</h3>
              <ul className="footer__link-list">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="footer__link"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__link-group">
              <h3 className="footer__link-title">Support</h3>
              <ul className="footer__link-list">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }
                      }}
                      className="footer__link"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__link-group">
              <h3 className="footer__link-title">Legal</h3>
              <ul className="footer__link-list">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Pick My Waste. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
