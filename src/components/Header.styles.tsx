import styled from "styled-components";
import { HeaderOptions } from "./types";

export const HeaderStyles = styled.div<HeaderOptions>`
  #g-header-bar {
    background-color: ${(props) => props.navbarBackgroundColor};
    color: ${(props) => props.navbarLinkColor};
    width: 100%;
    height: 55px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .g-header-links {
    margin-right: 10px;
    color: ${(props) => props.navbarLinkColor};
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
  }
  /* The Modal (background) */
  .g-modal {
    /* display: none; Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 10000; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }
  /* Modal Content */
  .g-modal-content {
    background-color: ${(props) => props.navbarBackgroundColor};
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  /* The Close Button */
  .g-close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .g-close:hover,
  .g-close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  .productTable h4 {
    margin-bottom: 0px;
    padding-bottom: 0px;
  }
  #oss-nav {
    cursor: pointer;
  }
  .ossCells {
    float: left;
    padding: 11px;
    margin-right: 5px;
    background-color: white;
  }
  .ossContentCells {
    float: left;
    width: 325px;
    padding-left: 5px;
  }
  .g-header-logo {
    height: 45px;
    background: url("${(props) => props.linkUrl}/static/logo.svg") no-repeat;
    width: 100px;
  }
  [data-theme="dark"] {
    .g-header-logo {
      background: url("${(props) =>
        props.linkUrl}/static/white-logo.png") no-repeat;
    }
  }
  .g-modal-content {
    width: 1000px;
  }
  .productTable {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    font-size: 15px;
    text-align: left;
    flex-wrap: wrap;
  }
  .flex-item-left {
    box-sizing: border-box;
    padding: 10px;
    flex: 50%;
  }
  .flex-item-right {
    box-sizing: border-box;
    padding: 10px;
    flex: 50%;
  }
  /* Responsive layout - makes a one column-layout instead of two-column layout */
  @media (max-width: 800px) {
    .g-modal-content {
      max-width: 95vw;
      margin: auto;
    }
    .flex-container {
      box-sizing: border-box;
      flex-direction: column;
    }
    .ossContentCells {
      width: 270px;
    }
  }
`;
