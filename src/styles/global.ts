import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`



 *{
        padding: 0;
    margin: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
         background: #fff;
        -webkit-font-smoothing: antialiased;
        margin: 0px;
    }

    body, input, button {
        font: 16px Roboto, sans-serif;
    }

    button {
        cursor: pointer;
    }

    html {
      /* a cada 1 rem é 10px */
       font-size: 62.5%;
    }

    @media (max-width: 1024px) {
      html {
          /* a cada 1 rem é 10px */
          font-size: 56.5%;
        }

    }

    @media (max-width: 900px) {
      html {
          /* a cada 1 rem é 10px */
          font-size: 52.5%;
        }

    }


`;
