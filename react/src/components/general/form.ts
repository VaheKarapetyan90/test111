import styled from "styled-components";
import { Form as newForm } from "antd";

interface FormProps {
  mr?: string;
  mt?: string;
  width?: string;
  border?: string;
  form: any;
  padding?: string;
  borderRadius?: string;
  onSubmit?: (React.FormEventHandler<HTMLFormElement> & (() => void)) | any;
}

const Form = styled(newForm)<FormProps>`
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  .ant-col-14 {
    max-width: 100%;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  .ant-col-offset-6 {
    margin-inline-start: 0;
  }
`;
export default Form;
