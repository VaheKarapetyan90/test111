import styled from "styled-components";
import { Input } from "antd";

interface InputProps {
  mr?: string;
  mt?: string;
  width?: string;
  border?: string;
  padding?: string;
  radius?: string;
  mxheight?: string;
  margin?: string;
}

const InputSimple = styled(Input)<InputProps>`
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin: ${({ margin }) => margin};

  max-height: ${({ mxheight }) => mxheight};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ radius }) => radius};

  &:focus,
  &:hover,
  &:active {
    border-color: #4096ff;
    box-shadow: #5dba2f;
    border-right-width: 1px;
    outline: 0;
  }
  .ant-input-focused {
    box-shadow: #5dba2f;
  }
`;
export default InputSimple;
