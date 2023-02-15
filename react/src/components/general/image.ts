import styled from "styled-components";
import { Image as img } from "antd";

type ImageProps = {
  src?: string;
  alt?: string;
  mr?: string;
  mt?: string;
  width?: string;
  height?: string;
  padding?: string;
  rounded?: string;
  preview?: boolean;
  objectFit?: string;
};

const Image = styled(img)<ImageProps>`
  object-fit: ${({ objectFit }) => objectFit || "cover"};
  margin-top: ${({ mt }) => mt};
  width: ${({ width }) => width};
  margin-right: ${({ mr }) => mr};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  border: ${({ width }) => width || "300px"};
  border-radius: ${({ rounded }) => rounded};
`;
export default Image;
