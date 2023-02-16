import { FC } from "react";
import { Recieved } from "../../assets/images/svg-components/Recieved";
import { Seen } from "../../assets/images/svg-components/Seen";
import { Sended } from "../../assets/images/svg-components/Sended";
import { Div, Text } from "../general";
import SvgIcon from "./svgIcon";
import { MessageStatusProps } from "./types";

const MessageStatus: FC<MessageStatusProps> = ({
  left,
  firstMessage,
  status,
}) => {
  return (
    <Div flex margin="0 0 0 5px">
      <SvgIcon
        Icon={
          status == "received" ? Recieved : status == "seen" ? Seen : Sended
        }
      ></SvgIcon>
    </Div>
  );
};
export default MessageStatus;
