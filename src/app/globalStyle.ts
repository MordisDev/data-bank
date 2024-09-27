"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-size: 16px;
    }

    body {
        color: black;
        background-color: white;
    }

    main {
        max-width: 1280px;
        margin: 0 auto;
    }
`;
