// Import the local font setup (React doesn't support `next/font` natively)
import { createGlobalStyle } from "styled-components";

const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-reg.ttf') format('truetype');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-Bold.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-Italic.ttf') format('truetype');
    font-weight: 300;
    font-style: italic;
  }

  /* Add other weights if necessary */
`;

export default GlobalFonts;
