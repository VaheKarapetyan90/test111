import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";

type TextProps = {
  bgc?: string;
  value: string;
  width?: string;
  height?: string;
  border?: string;
  margin?: string;
  radius?: string;
  autoSize?: any;
  padding?: string;
  mxheight?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Textarea = styled(TextArea)<TextProps>`
  width: ${({ width }) => width};
  border: ${({ border }) => border};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ bgc }) => bgc};
  max-height: ${({ mxheight }) => mxheight};
  border-radius: ${({ radius }) => radius};

  .ant-input {
    border-radius:0 !inportant;
  }
`;
export default Textarea;
