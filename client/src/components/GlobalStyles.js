import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: #1d3557;
    --max-content-width: 1200px;
    --heading-font-family: 'Teko', sans-serif;
    --wrapper-padding: 0 5vw;
    --primary-background-color: #d88c9a;
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
  time, mark, audio, video {
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

  ol, ul {
    list-style: none;
  }

  li {
    list-style: none;
    width: 200px;
  }

  select, input {
    width: 200px;
    margin-top: 5px;
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
    font-size: 20px;
  }

  h3 {
    margin: 5px 0;
  }

  button {
    background-color: #f0eff4;
    color: var(--primary-color);
    border-radius: 5px;
    border: 1px solid;
    margin: 5px;
  }

  img {
    height: 120px;
    width: 120px;
    border-radius: 10px;
    margin-right: 5px;
  }
`;