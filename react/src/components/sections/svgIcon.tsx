import React from "react";
import { SvgContainer } from "../general/svgIcon";

interface Props {
  width?: string;
  height?: string;
  margin?: string;
  color?: string;
  fill?: string;
  visibility?: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  onClick?: () => void;
}

const SvgIcon: React.FC<Props> = (props) => {
  const { Icon } = props;
  return (
    <SvgContainer {...props}>
      <Icon />
    </SvgContainer>
  );
};

export default SvgIcon;
