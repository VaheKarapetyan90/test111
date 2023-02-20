import styled from "styled-components";

interface IProps {
  oY?: string;
  bgc?: string;
  fSize?: string;
  width?: string;
  hover?: boolean;
  cursor?: string;
  height?: string;
  radius?: string;
  margin?: string;
  mxWidth?: string;
  mnWidth?: string;
  borderL?: string;
  borderR?: string;
  borderT?: string;
  borderb?: string;
  display?: string;
  padding?: string;
  jContent?: string;
  mxheight?: string;
  position?: string;
  mnHeight?: string;
  textAlign?: string;
  direction?: string;
  transition?: string;
}

const Content = styled.div`
  cursor: ${({ cursor }) => cursor};
  overflow-y: ${({ oY }) => oY};
  height: ${({ height }) => height};
  font-size: ${({ fSize }) => fSize};
  display: ${({ display }) => display};
  border-top: ${({ borderT }) => borderT};
  position: ${({ position }) => position};
  border-radius: ${({ radius }) => radius};
  border-left: ${({ borderL }) => borderL};
  max-height: ${({ mxheight }) => mxheight};
  min-height: ${({ mnHeight }) => mnHeight};
  border-right: ${({ borderR }) => borderR};
  border-bottom: ${({ borderb }) => borderb};
  transition: ${({ transition }) => transition};
  justify-content: ${({ jContent }) => jContent};
  padding: ${({ padding }) => padding || "15px"};
  flex-direction: ${({ direction }) => direction};
  margin: ${({ margin }) => margin || "30px 0 0"};
  width: ${({ width }: IProps) => width || "100%"};
  max-width: ${({ mxWidth }) => mxWidth || "696px"};
  min-width: ${({ mnWidth }) => mnWidth};
  text-align: ${({ textAlign }) => textAlign || "center"};
  background-color: ${({ bgc }: IProps) => bgc || "#B7D9F2"};

  &:hover {
    background-color: ${({ hover }) => hover && "#F1F1F1"};
  }
`;
export default Content;
