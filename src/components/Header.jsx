import React from "react";

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <div className="header-container" >
      <div className="header-subContainer">
        <span>Set Mode</span>
        <label className="theme-toggle">
          <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default Header;
