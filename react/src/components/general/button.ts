import { Button as NewButton } from "antd";
import styled from "styled-components";

interface ButtonProps {
  type?: string;
  bgc?: string;
  width?: string;
  height?: string;
  margin?: string;
  radius?: string;
  padding?: string;
  mxWidth?: string;
  htmlType?: string;
  border?: string;
  display?: string;
  alignitem?: string;
  justifycontent?: string;
}

const Button = styled(NewButton)<ButtonProps>`
  text-align: center;
  display: ${({ display }) => display};
  align-items: ${({ alignitem }) => alignitem};
  justify-content: ${({ justifycontent }) => justifycontent};
  border: ${({ border }) => border};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  margin: ${({ margin }) => margin || "30px 0"};
  padding: ${({ padding }) => padding || "15px"};
  background-color: ${({ bgc }) => bgc || "#B7D9F2"};
  max-width: ${({ mxWidth }) => mxWidth || "800px"};
  border-radius: ${({ radius }) => radius || "9px"};
`;
export default Button;
