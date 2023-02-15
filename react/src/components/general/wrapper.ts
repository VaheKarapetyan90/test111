import styled from "styled-components";

type WrapperProps = {
  bgc?: string;
  height?: string;
  margin?: string;
  marginL?: string;
  padding?: string;
  mxWidth?: string;
  display?: string;
  jContent?: string;
  mnHeight?: string;
  position?: string;
  alignitems?: string;
  alignContent?: string;
  flexDirection?: string;
};

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  margin: ${({ margin }) => margin};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  max-width: ${({ mxWidth }) => mxWidth};
  position: ${({ position }) => position};
  margin-left: ${({ marginL }) => marginL};
  min-height: ${({ mnHeight }) => mnHeight};
  display: ${({ display }) => display || "flex"};
  background-color: ${({ bgc }) => bgc || "#B7D9F2"};
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignitems }) => alignitems || "center"};
  align-content: ${({ alignContent }) => alignContent || "center"};
  justify-content: ${({ jContent }) => jContent || "space-between"};
`;
export default Wrapper;
