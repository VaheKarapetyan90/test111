import styled from "styled-components";

type FileLinkProps = {
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
  href?: string;
  display?: string;
  jContent?: string;
  alignitems?: string;
};

const FileLink = styled.a<FileLinkProps>`
  text-decoration: none;
  font-style: normal;
  font-family: "Source Sans Pro";
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  text-align: ${({ align }) => align};
  padding: ${({ padding }) => padding};
  max-width: ${({ mxWidth }) => mxWidth};
  font-size: ${({ fSize }) => fSize || "20px"};
  line-height: ${({ lineHeight }) => lineHeight};
  display: ${({ display }) => display};
  justify-content: ${({ jContent }) => jContent};
  align-items: ${({ alignitems }) => alignitems};
  font-weight: ${({ fWeight }) => fWeight || 400};
  overflow: ${({ overflow }) => overflow && "hidden"};
  white-space: ${({ whiteSpace }) => whiteSpace && "nowrap"};
  -o-text-overflow: ${({ oTextOverflow }) => oTextOverflow && "ellipsis"};
  text-overflow: ${({ textOverflow }) => textOverflow && "ellipsis"};
`;
export default FileLink;
