import styled from "styled-components";

interface IProps {
  oX?: boolean;
  bgc?: string;
  flex?: string;
  width?: string;
  border?: string;
  height?: string;
  borderL?: string;
  borderR?: string;
  borderT?: string;
  borderB?: string;
  padding?: string;
  mxWidth?: string;
  alignitems?: string;
  justifycontent?: string;
}

const Flex = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  max-width: ${({ mxWidth }) => mxWidth};
  border-top: ${({ borderT }) => borderT};
  display: ${({ flex }) => flex || "Flex"};
  border-left: ${({ borderL }) => borderL};
  border-right: ${({ borderR }) => borderR};
  border-bottom: ${({ borderB }) => borderB};
  overflow-x: ${({ oX }) => (oX ? "hidden" : "")};
  justify-content: ${({ justifycontent }: IProps) =>
    justifycontent || "center"};
  align-items: ${({ alignitems }: IProps) => alignitems || "center"};
`;
export default Flex;
