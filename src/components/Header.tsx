import React from "react";
import { HeaderStyles } from "./Header.styles";
import { HeaderModal } from "./HeaderModal";
import { HeaderOptions } from "./types";

export interface HeaderProps extends HeaderOptions {}

export const Header: React.FC<HeaderProps> = (props) => {
  const {
    linkUrl = "https://the-guild.dev",
    navbarBackgroundColor = "var(--ifm-navbar-background-color)",
    navbarLinkColor = "var(--ifm-navbar-link-color)",
  } = props;
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <HeaderStyles {...props}>
      <div id="g-header-bar">
        <a href={linkUrl} title="The Guild - Open Source">
          <div className="g-header-logo"></div>
          {/* <!--<picture>
            <source srcset="${linkUrl}/static/white-logo.png" media="(prefers-color-scheme: dark)" />
            <source srcset="${linkUrl}/static/logo.svg" media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)" />
            <img src="${linkUrl}/static/logo.svg" alt="The Guild Logo"/ />
          </picture>--> */}
        </a>
        <div>
          <a href={`${linkUrl}/services`} className="g-header-links">
            Our Services
          </a>
          <a
            id="oss-nav"
            className="g-header-links"
            onClick={() => setModalOpen(true)}
          >
            Open Source
            <img
              src={`${linkUrl}/static/go-down.svg`}
              height="10"
              width="12"
              style={{ color: "black" }}
            />
          </a>
          {/* <!--<a href="${linkUrl}/open-source" className="g-header-links">Products</a>--> */}
          <a href={`${linkUrl}/blog`} className="g-header-links">
            Blog
          </a>
          <a href={`${linkUrl}/about-us`} className="g-header-links">
            Company
          </a>
        </div>
      </div>
      {modalOpen && (
        <HeaderModal {...props} onClose={() => setModalOpen(false)} />
      )}
    </HeaderStyles>
  );
};
