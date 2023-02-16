import styled from "styled-components";

export const SvgContainer = styled.div<{
  fill?: string;
  color?: string;
  width?: string;
  margin?: string;
  height?: string;
  visibility?: string;
  zIndx?: string;
}>`
  height: "auto";
  width: "auto";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  // margin: "";
  color: "";
  cursor: pointer;
  fill: "";
  zindx: "";

  & svg {
    color: ${({ fill }) => fill};
    color: ${({ color }) => color};
    z-index: ${({ zIndx }) => zIndx};
    visibility: ${({ visibility }) => visibility};
    margin: ${(props) => (props.margin ? `${props.margin}` : "")};
    width: ${(props) => (props.width ? `${props.width}px` : "100%")};
    height: ${(props) => (props.height ? `${props.height}px` : "100%")};
  }
`;
