import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --primary-color: #1d3557;
    --max-content-width: 1280px;
    --heading-font-family: 'Poppins', sans-serif;
    --primary-background-color: rgba(242, 132, 130, 1);
  }

  html, body, div, span, applet, object, iframe,
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

  body {
    line-height: 1;
    color: var(--primary-color);
    font-family: var(--heading-font-family);
  }

  ol, ul, li {
    list-style: none;
    padding: 3px;
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
  }

  h2 {
    font-size: 18px;
  }

  button {
    color: var(--primary-color);
    border-radius: 5px;
    border: none;
    margin: 0 5px;
    outline: 1px solid var(--primary-color);
    background: transparent;
    font-family: var(--heading-font-family);

    &:hover {  
      outline: 3px solid var(--primary-color);
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
    padding: 3px 5px;
    border-radius: 5px;
    outline: 1px solid var(--primary-color);
    border: none;
    font-family: var(--heading-font-family);
    box-sizing: border-box;
    margin: 5px 5px 0 5px;
    flex: auto;
    gap: auto;

    &:focus {
      outline: 2px solid var(--primary-color);
    }
  }
`;
