import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import countries from "./countries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");

  const category = [
    "business", "entertainment", "general",
    "health", "science", "sports", "technology", "politics"
  ];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light-theme" ? "dark-theme" : "light-theme"));
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/NEWS.png"
            alt="InfoBurt Logo"
            className="h-10 w-auto object-contain logo-img"
          />
        </Link>


        <ul className={active ? "nav-ul flex gap-11 active" : "nav-ul flex gap-11"}>
          <li>
            <Link to="/" onClick={() => setActive(false)}>All News</Link>
          </li>

          <li className="dropdown-li">
            <Link onClick={() => {
              setShowCategoryDropdown(!showCategoryDropdown);
              setShowCountryDropdown(false);
            }}>
              Top-Headlines <FontAwesomeIcon icon={faCircleArrowDown} className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} />
            </Link>

            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => (
                <li key={index} onClick={() => setShowCategoryDropdown(false)}>
                  <Link to={`/top-headlines/${element}`} onClick={() => setActive(false)} className="capitalize">
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="dropdown-li">
            <Link onClick={() => {
              setShowCountryDropdown(!showCountryDropdown);
              setShowCategoryDropdown(false);
            }}>
              Country <FontAwesomeIcon icon={faCircleArrowDown} className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} />
            </Link>

            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {countries.map((element, index) => (
                <li key={index} onClick={() => setShowCountryDropdown(false)}>
                  <Link to={`/country/${element?.iso_2_alpha}`} onClick={() => setActive(false)} className="flex gap-3">
                    <img
                      src={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png`}
                      alt={element?.countryName}
                      className="flags"
                    />
                    <span>{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Dark Mode Toggle */}
          <li>
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle Dark Mode">
              <FontAwesomeIcon icon={theme === "light-theme" ? faMoon : faSun} className="text-xl theme-toggle-icon" />
            </button>
          </li>
        </ul>

        {/* Hamburger */}
        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => setActive(!active)}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
// Note: Ensure that the CSS classes used in this component are defined in your stylesheets for proper styling and functionality.
// The component uses React Router for navigation and FontAwesome for icons.