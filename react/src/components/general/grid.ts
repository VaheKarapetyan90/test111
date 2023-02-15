import styled from "styled-components";

type GridProps = {
  gap?: string;
};

const Grid = styled.div<GridProps>`
  display: grid;
  gap: ${({ gap }) => gap};
`;
export default Grid;
