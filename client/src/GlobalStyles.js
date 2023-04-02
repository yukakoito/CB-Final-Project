import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --primary-color: #1d3557;
    --max-content-width: 1280px;
    --heading-font-family: 'Poppins', sans-serif;
    --primary-background-color: rgba(242, 132, 130, 1);
    --header-height: 85px;
  }

  html, body, main, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  header, footer {
    background-color: var(--primary-background-color);
    width: 100%;
    height: var(--header-height);
  }

  body {
    line-height: 1.3;
    color: var(--primary-color);
    font-family: var(--heading-font-family);
  }

  ol, ul, li {
    list-style: none;
    padding: 5px;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  h1 {
    font-size: 22px;
    margin: 10px auto;
    text-align: center;
  }

  h2 {
    font-size: 18px;
    line-height: 1.2;
  }

  button {
    color: var(--primary-color);
    border-radius: 5px;
    border: none;
    outline: 1px solid var(--primary-color);
    background: transparent;
    font-family: var(--heading-font-family);
    font-size: 100%;

    &:hover {  
      outline: 2px solid var(--primary-color);
      cursor: pointer;
    }
  }

  img {
    height: 120px;
    width: 120px;
    border-radius: 10px;
    margin-right: 5px;
  }

  input, select {
    width:48%;
    min-width: 175px;
    padding: 5px;
    border-radius: 5px;
    outline: 1px solid var(--primary-color);
    border: none;
    font-family: var(--heading-font-family);
    box-sizing: border-box;
    flex: auto;
    font-size: 100%;

    &:focus {
      outline: 2px solid var(--primary-color);
    }
  }
`;
