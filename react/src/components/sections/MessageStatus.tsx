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
    <Div
      flex
      margin="0 0 0 5px"
      // position="absolute"
      // bottom={firstMessage ? "0" : "0"}
      // right={!left ? "30px" : ""}
      // left={left ? "30px" : ""}
    >
      <SvgIcon
        Icon={
          status == "received" ? Recieved : status == "seen" ? Seen : Sended
        }
      ></SvgIcon>
      {/* <Text color="#878787" fSize="12px" lineHeight="15px" fWeight="400">
        {status}
      </Text> */}
    </Div>
  );
};
export default MessageStatus;
