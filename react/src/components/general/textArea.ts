import styled from "styled-components";

type TextProps = {
  bgc?: string;
  value: string;
  width?: string;
  height?: string;
  border?: string;
  margin?: string;
  radius?: string;
  padding?: string;
  mxheight?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Textarea = styled.textarea<TextProps>`
  width: ${({ width }) => width};
  border: ${({ border }) => border};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ bgc }) => bgc};
  max-height: ${({ mxheight }) => mxheight};
  border-radius: ${({ radius }) => radius};
`;
export default Textarea;
