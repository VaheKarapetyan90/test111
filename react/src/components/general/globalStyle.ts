import styled from "styled-components";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    .ant-tooltip-placement-bottomRight{
        padding-top:0;
    }
    .ant-tooltip-inner {
      background: #F2F2F2;
      border: 1px solid #C5C5C5;
      border-radius: 3px;
      z-index:0;
    }
    .ant-tooltip .ant-tooltip-arrow {
      width:0px
    }
  }`;
export default GlobalStyle;
