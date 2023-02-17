import styled from "styled-components";

type DivProps = {
  ref?: any;
  oY?: string;
  bgc?: string;
  top?: string;
  left?: string;
  flex?: boolean;
  width?: string;
  right?: string;
  border?: string;
  height?: string;
  bottom?: string;
  margin?: string;
  zIndex?: string;
  mxWidth?: string;
  borderL?: string;
  borderR?: string;
  borderT?: string;
  borderb?: string;
  padding?: string;
  rounded?: string;
  mnHeight?: string;
  mxheight?: string;
  position?: string;
  alignitems?: string;
  fDirection?: string;
  justifycontent?: string;
  hover?: boolean;
  cursor?: string;
  minwidth?: string;
};

const Div = styled.div<DivProps>`
  border: ${({ border }) => border};
  top: ${({ top }) => top};
  overflow-y: ${({ oY }) => oY};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  width: ${({ width }) => width};
  cursor: ${({ cursor }) => cursor};
  min-width: ${({ minwidth }) => minwidth};
  bottom: ${({ bottom }) => bottom};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  z-index: ${({ zIndex }) => zIndex};
  padding: ${({ padding }) => padding};
  background-color: ${({ bgc }) => bgc};
  max-width: ${({ mxWidth }) => mxWidth};
  position: ${({ position }) => position};
  border-top: ${({ borderT }) => borderT};
  border-left: ${({ borderL }) => borderL};
  max-height: ${({ mxheight }) => mxheight};
  min-height: ${({ mnHeight }) => mnHeight};
  border-right: ${({ borderR }) => borderR};
  border-radius: ${({ rounded }) => rounded};
  border-bottom: ${({ borderb }) => borderb};
  display: ${({ flex }) => (flex ? "flex" : "")};
  align-items: ${({ alignitems }) => alignitems};
  flex-direction: ${({ fDirection }) => fDirection};
  justify-content: ${({ justifycontent }) => justifycontent};

  &:hover {
    background-color: ${({ hover }) => hover && "#f2f2f2"};
  }
`;
export default Div;
