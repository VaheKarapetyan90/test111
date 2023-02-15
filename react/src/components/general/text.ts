import styled from "styled-components";

type TextProps = {
  fSize?: string;
  color?: string;
  align?: string;
  width?: string;
  padding?: string;
  fWeight?: string;
  mxWidth?: string;
  overflow?: string;
  lineHeight?: string;
  whiteSpace?: boolean;
  textOverflow?: boolean;
  oTextOverflow?: boolean;
  owerflowWrap?: string;
  height?: string;
  display?: string;
  jcontent?: string;
};

const Text = styled.p<TextProps>`
  display: ${({ display }) => display};
  justyfy-content: ${({ jcontent }) => jcontent};
  font-style: normal;
  overflow-wrap: ${({ owerflowWrap }) => owerflowWrap};
  font-family: "Source Sans Pro";
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  color: ${({ color }) => color};
  text-align: ${({ align }) => align};
  padding: ${({ padding }) => padding};
  max-width: ${({ mxWidth }) => mxWidth};
  font-size: ${({ fSize }) => fSize || "20px"};
  line-height: ${({ lineHeight }) => lineHeight};
  font-weight: ${({ fWeight }) => fWeight || 400};
  overflow: ${({ overflow }) => overflow && "hidden"};
  white-space: ${({ whiteSpace }) => whiteSpace && "nowrap"};
  -o-text-overflow: ${({ oTextOverflow }) => oTextOverflow && "ellipsis"};
  text-overflow: ${({ textOverflow }) => textOverflow && "ellipsis"};
`;
export default Text;
