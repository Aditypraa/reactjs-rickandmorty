import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

function Navbar() {
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Handle toggle menu completely manually, not relying on Bootstrap JS
  const toggleNavbar = () => {
    setNavbarCollapsed(!navbarCollapsed);
  };

  // Close navbar when clicking a link on mobile
  const closeNavbar = () => {
    if (!navbarCollapsed) {
      setNavbarCollapsed(true);
    }
  };

  // Add scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when window resizes to larger size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && !navbarCollapsed) {
        setNavbarCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navbarCollapsed]);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark ${styles.navbar} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
      <div className="container">
        <Link
          to="/"
          className={`ubuntu navbar-brand ${styles.navbarBrand}`}
          onClick={closeNavbar}
        >
          <div className={styles.logoWrapper}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
              alt="Rick and Morty"
              className={styles.logo}
            />
          </div>
          <span className={styles.brandText}>
            Rick & Morty <span className="text-primary">Wiki</span>
          </span>
        </Link>

        {/* Simplified toggler without Bootstrap data attributes */}
        <button
          className={`navbar-toggler ${styles.navbarToggler}`}
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarMenu"
          aria-expanded={!navbarCollapsed}
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${styles.togglerIcon}`}></span>
        </button>

        {/* Directly control visibility with styles instead of classes */}
        <div
          id="navbarMenu"
          className={`${styles.navbarCollapse} ${
            navbarCollapsed ? "" : styles.show
          }`}
        >
          <div className={`${styles.navLinks}`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={closeNavbar}
            >
              <i className="fas fa-user-astronaut me-1 d-inline-block d-lg-none"></i>
              Characters
            </NavLink>
            <NavLink
              to="/episodes"
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={closeNavbar}
            >
              <i className="fas fa-film me-1 d-inline-block d-lg-none"></i>
              Episodes
            </NavLink>
            <NavLink
              to="/locations"
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={closeNavbar}
            >
              <i className="fas fa-globe me-1 d-inline-block d-lg-none"></i>
              Locations
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
