import { FC } from "react";
import { Skeleton } from "antd";

import Window from "./Window";
import UserInfo from "./UserInfo";

import { MessageWindowListProps } from "./types";

import { Content } from "../../general";
import { chatState } from "../../meta/Context/ChatProvider";

const MessageWindow: FC<MessageWindowListProps> = ({
  data,
  messagesLoading,
  messagesFetching,
}) => {
  const { opened, collapsed, resize } = chatState();
  return (
    <Content
      bgc="#fff"
      margin="0"
      padding="0"
      textAlign=" "
      height={`${resize ? "calc(100% - 78px)" : "100%"}`}
      display="flex"
      mxheight="704px"
      direction="column"
      jContent="felx-start"
      width={`${resize ? "100%" : collapsed ? "380px" : "630px"}`}
      mxWidth={`${resize ? " " : collapsed ? "380px" : "630 px"}`}
      mnWidth="300px"
    >
      {opened && (
        <>
          <>
            <UserInfo data={data} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "calc(100% - 117px)",
                justifyContent: "space-between",
              }}
            >
              <Window
                messageList={data}
                messagesLoading={messagesLoading}
                messagesFetching={messagesFetching}
              />
            </div>
          </>
        </>
      )}
    </Content>
  );
};

export default MessageWindow;
