import React from "react";

const Nav2 = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/scraper" className="navbar-brand">
          See Scraped Articles
        </a>
      </div>
    </div>
  </nav>;

export default Nav2;
