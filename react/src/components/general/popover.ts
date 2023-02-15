import styled from "styled-components";
import { Tooltip as newPopover } from "antd";

interface newPopoverProps {
  padding?: string;
  borderRadius?: string;
  onSubmit?: (React.FormEventHandler<HTMLFormElement> & (() => void)) | any;
}

const Popover = styled(newPopover)<newPopoverProps>`
  .ant-tooltip-arrow {
    display: none;
  }
`;
export default Popover;
