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
  borderb?: string;
  bColor?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Textarea = styled(TextArea)<TextProps>`
  width: ${({ width }) => width};
  border: ${({ border }) => border};
  border-bottom: ${({ borderb }) => borderb};
  border-color: ${({ bColor }) => bColor};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ bgc }) => bgc};
  max-height: ${({ mxheight }) => mxheight};
  border-radius: ${({ radius }) => radius};
  :where(.css-dev-only-do-not-override-26rdvq).ant-input {
    border-radius: 6px 6px 0 0;
  }
  :where(.css-dev-only-do-not-override-26rdvq).ant-input:hover {
    border-color: #dfe5e6;
  }
  :where(.css-dev-only-do-not-override-26rdvq).ant-input:focus {
    border-color: #dfe5e6;
  }
`;
export default Textarea;
