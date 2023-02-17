import styled from "styled-components";

type CardWrapperProps = {
  oY?: string;
  top?: string;
  bgc?: string;
  fSize?: string;
  width?: string;
  bottom?: string;
  height?: string;
  margin?: string;
  radius?: string;
  cursor?: string;
  border?: string;
  display?: string;
  borderL?: string;
  borderR?: string;
  borderT?: string;
  borderb?: string;
  mxWidth?: string;
  padding?: string;
  mxheight?: string;
  mnHeight?: string;
  position?: string;
  jContent?: string;
  textAlign?: string;
  left?: string;
  right?: string;
  fDirection?: string;
  onClick?: (id: number) => void;
};

const CardWrapper = styled.div<CardWrapperProps>`
  box-sizing: border-box;
  // z-index: 1000;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  overflow-y: ${({ oY }) => oY};
  margin: ${({ margin }) => margin};
  border: ${({ border }) => border};
  bottom: ${({ bottom }) => bottom};
  cursor: ${({ cursor }) => cursor};
  height: ${({ height }) => height};
  font-size: ${({ fSize }) => fSize};
  padding: ${({ padding }) => padding};
  display: ${({ display }) => display};
  border-top: ${({ borderT }) => borderT};
  position: ${({ position }) => position};
  width: ${({ width }) => width || "100%"};
  border-radius: ${({ radius }) => radius};
  border-left: ${({ borderL }) => borderL};
  min-height: ${({ mnHeight }) => mnHeight};
  border-right: ${({ borderR }) => borderR};
  border-bottom: ${({ borderb }) => borderb};
  justify-content: ${({ jContent }) => jContent};
  flex-direction: ${({ fDirection }) => fDirection};
  background-color: ${({ bgc }) => bgc || "#B7D9F2"};
  max-height: ${({ mxheight }) => mxheight || "696px"};
  max-width: ${({ mxWidth }) => mxWidth};
  text-align: ${({ textAlign }) => textAlign || "center"};

  &:hover {
    cursor: pointer;

    svg {
      visibility: visible;
    }
  }
`;
export default CardWrapper;
