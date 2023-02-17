import { useCallback, useContext, useEffect, useState } from "react";

import SvgIcon from "../components/sections/svgIcon";
import ChatboxNav from "../components/sections/Chatbox/ChatboxNav";
import MessageList from "../components/sections/Chatbox/MessageList";
import MessageWindow from "../components/sections/Chatbox/MessageWindow";
import {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useSocketConnectionQuery,
  useGetMessagesByIdMutation,
  useLazyGetMessagesInfoQuery,
  useLazySocketConnectionQuery,
  useReceivePrivateMessageMutation,
  useChangeNotificationStatusMutation,
} from "../libs/redux/auth.api";
import { useNavigate } from "react-router-dom";
import { chatState } from "../components/meta/Context/ChatProvider";
import { Wrapper, Content, Flex, Div, Text } from "../components/general";
import { OpenMessage } from "../assets/images/svg-components/OpenMessage";

export default function Home() {
  const {
    opened,
    setOpened,
    active,
    setActive,
    userInfo,
    setUserInfo,
    messageData,
    setMessageData,
    page,
    setPage,
    resize,
    text,
    parsedData,
    setText,
  } = chatState();

  var count = 0;
  const [notfCount, setNotfCount] = useState(0);

  const {} = useSocketConnectionQuery();
  const { data: notf } = useGetUsersQuery(userInfo?.user_id);
  const [getMessagesById, {}] = useGetMessagesByIdMutation();
  const [socketConnection, {}] = useLazySocketConnectionQuery();
  const [changeNotificationStatus, {}] = useChangeNotificationStatusMutation();
  const [getUsers, { data: usersQueryData, isLoading: usersQueryLoading }] =
    useLazyGetUsersQuery();
  const [
    getMessagesInfo,
    { isLoading: messagesLoading, isFetching: messagesFetching, data },
  ] = useLazyGetMessagesInfoQuery();
  const [receivePrivateMessage, {}] = useReceivePrivateMessageMutation();

  useEffect(() => {
    setNotfCount(count);
  }, [notf]);

  useEffect(() => {
    notf?.usersAndChats?.forEach(
      ({
        id,
        chat_id,
        notification,
      }: {
        id: number;
        chat_id: number;
        notification: number;
      }) => {
        if (notification > 0) {
          receivePrivateMessage({
            sender_id: id,
            chat_id: chat_id,
            receiver_id: parsedData?.id,
          });
        }
      }
    );
  }, [notf]);

  notf?.usersAndChats?.forEach(({ id, notification }: any) => {
    count = count + Number(notification);
    return count;
  });

  const handleGetMessages = useCallback(
    (
      id: number,
      chat_type: string,
      user_name: string,
      user_picture: string,
      user_position: string,
      user_department: string,
      notification: number,
      chat_id: number
    ) => {
      setOpened(false);
      if (chat_type === "private") {
        messageData.length > 0 && setMessageData([]);
        changeNotificationStatus(id);
        getMessagesInfo(id);
        getMessagesById(id);
        setOpened(true);
        setUserInfo({
          chat_id,
          notification: notification,
          user_id: id,
          user_name: user_name,
          user_picture: user_picture,
          user_position: user_position,
          user_department: user_department,
        });
        setPage(1);
        setText("");
      } else {
        changeNotificationStatus(id);
        getMessagesInfo(id);
        getMessagesById(id);
        setUserInfo({
          chat_id,
          notification: notification,
          user_id: id,
          user_name: user_name,
          user_picture: user_picture,
          user_position: user_position,
          user_department: user_department,
        });
        setOpened(true);
        setPage(1);
        setText("");
      }
    },
    []
  );

  return (
    <Wrapper
      jContent={resize ? "" : "flex-end"}
      bgc="#fff"
      alignitems={resize ? "" : "flex-end"}
      height={resize ? "" : "100vh"}
    >
      {active ? (
        <>
          <Content
            width="100%"
            mxWidth={resize ? " " : "696px"}
            margin={resize ? " " : "0 30px 30px 0"}
            radius="3px"
            position={resize ? " " : "fixed"}
            bgc="#fff"
            height={resize ? "" : "804px"}
            mxheight={resize ? " " : " calc(100vh - 85px )"}
            padding=" "
            mnHeight={resize ? " " : `${opened && "290px"}`}
            textAlign=" "
          >
            <ChatboxNav active={active} setActive={setActive} />
            <Div
              height={resize ? "calc(100vh - 78px)" : "calc(100% - 76px)"}
              borderb="1px solid #ABC2DA"
              borderT="1px solid #ABC2DA"
              borderL="1px solid #ABC2DA"
              borderR="1px solid #ABC2DA"
            >
              <Flex
                justifycontent="space-between"
                alignitems="flex-start"
                height={resize ? " 100%" : "calc(100% - 10px)"}
              >
                <MessageList
                  usersQueryLoading={usersQueryLoading}
                  usersQueryData={usersQueryData}
                  data={data}
                  handleGetMessages={handleGetMessages}
                />
                <MessageWindow
                  data={data}
                  messagesLoading={messagesLoading}
                  messagesFetching={messagesFetching}
                />
              </Flex>
            </Div>
          </Content>
        </>
      ) : (
        <Div padding=" 0 15px 15px 0" position="relative">
          <SvgIcon
            Icon={OpenMessage}
            onClick={() => {
              socketConnection(),
                getUsers(userInfo?.user_id),
                setActive(!active);
            }}
          />
          {count > 0 && (
            <Div
              width="16px"
              height="16px"
              bgc="#4689E3"
              rounded="50%"
              position="absolute"
              top="40px"
              left="40px"
              flex
              justifycontent="center"
            >
              <Text color="#fff" fSize="12px" lineHeight="15px" fWeight="600">
                {notfCount}
              </Text>
            </Div>
          )}
        </Div>
      )}
    </Wrapper>
  );
}
