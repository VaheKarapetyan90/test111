import { FC, useEffect, useMemo, useRef, useState } from "react";
import { CardProps } from "./types";
import { getTime } from "../../helpers/getTime";
import { useInitials } from "../../hooks/UseInitials";
import { randomColor } from "../../helpers/randomColors";
// import { useGetMessagesInfoQuery } from "../../libs/redux/auth.api";
import {
  CardWrapper,
  Content,
  Text,
  Image,
  Flex,
  Div,
  Grid,
  Span,
} from "../general";
import { chatState } from "../meta/Context/ChatProvider";
import { useReceivePrivateMessageMutation } from "../../libs/redux/auth.api";

const Card: FC<CardProps> = ({
  id,
  name,
  time,
  opened,
  activeUser,
  message,
  onClick,
  chat_id,
  collapsed,
  chat_type,
  lt_msg_file,
  user_picture,
  notification,
  user_position,
  user_department,
  current_chat_id,
}) => {
  const { page, resize } = chatState();
  const [newMessagescCount, setNewMessagesCount] = useState<any>([
    {
      chat_id: current_chat_id,
      notification,
    },
  ]);

  // const [receivePrivateMessage, {}] = useReceivePrivateMessageMutation();

  const initials = useInitials(name);

  // useEffect(() => {
  //   if (notification > 0) {
  //     receivePrivateMessage({ sender_id: id, chat_id: current_chat_id });
  //   }
  // }, [notification]);

  useEffect(() => {
    setNewMessagesCount([
      {
        chat_id: chat_id,
        notification,
      },
    ]);
  }, [opened, notification]);

  const memoizedCallback = useMemo(
    () => () =>
      onClick!(
        id,
        chat_type,
        name,
        user_picture,
        user_position,
        user_department,
        notification,
        current_chat_id
      ),
    [
      chat_type,
      name,
      user_picture,
      user_position,
      user_department,
      notification,
      current_chat_id,
      onClick,
    ]
  );

  return (
    <CardWrapper
      cursor="pointer"
      bgc="#fff"
      borderb="1px solid #ABC2DA"
      onClick={memoizedCallback}
    >
      <Content
        hover
        margin="0"
        bgc="#fff"
        mxheight="78px"
        mnHeight="20px"
        mxWidth={`${
          !resize && !collapsed
            ? "90px"
            : resize && !collapsed
            ? "120px"
            : resize && collapsed
            ? "373px"
            : "315px"
        }`}
        padding={`${collapsed ? "0 9px" : "12px"}`}
        // padding={`${collapsed ? "0 9px" : "14px 20px"}`}
      >
        <Flex justifycontent="flex-start" alignitems="center">
          <Div>
            {user_picture ? (
              <Div width="40px" position="relative">
                <Div
                  width="8px"
                  height="8px"
                  bgc={activeUser ? "#17B373" : "#878787"}
                  rounded="50%"
                  position="absolute"
                  bottom="0"
                ></Div>
                <Image
                  preview={false}
                  width="40px"
                  height="40px"
                  rounded="50%"
                  src={user_picture}
                  alt="image user"
                />
                {!collapsed && newMessagescCount[0].notification > 0 && (
                  <Div
                    position="absolute"
                    bottom="0"
                    right="-5px"
                    width="16px"
                    height="16px"
                    rounded="50%"
                    flex
                    justifycontent="center"
                    alignitems="center"
                    bgc="#4689E3"
                  >
                    <Text color="#fff" fSize="12px" fWeight="600">
                      {newMessagescCount[0].notification}
                    </Text>
                  </Div>
                )}
              </Div>
            ) : (
              <Div
                position="relative"
                flex
                justifycontent="center"
                alignitems="center"
                rounded="50%"
                width="40px"
                height="40px"
                bgc={`${randomColor}`}
              >
                {initials}
                {!collapsed && (
                  <Div
                    bottom="0"
                    right="-5px"
                    width="16px"
                    height="16px"
                    rounded="50%"
                    flex
                    justifycontent="center"
                    alignitems="center"
                    bgc="#4689E3"
                  >
                    <Text color="#fff" fSize="12px" fWeight="600">
                      {newMessagescCount[0].notification}
                    </Text>
                  </Div>
                )}
              </Div>
            )}
          </Div>
          {collapsed && (
            <Flex
              width="100%"
              alignitems="center"
              justifycontent="space-between"
              height="65px"
            >
              <Div padding="7px">
                <Text
                  padding="0"
                  fSize="16px"
                  align="left"
                  mxWidth="189px"
                  fWeight="400"
                  lineHeight="20px"
                >
                  {name}
                </Text>
                <Text
                  overflow="hidden"
                  textOverflow
                  whiteSpace
                  padding="0"
                  align="left"
                  color={"#858585"}
                  mxWidth="189px"
                  fWeight="400"
                  fSize="14px"
                  lineHeight="20px"
                >
                  {user_department && (
                    <Span
                      color="#373435"
                      fWeight="400"
                      fSize="14px"
                      lineHeight="20px"
                    >{`${user_department} | `}</Span>
                  )}
                  {`${user_position}`}
                </Text>
                <Text
                  align="left"
                  oTextOverflow
                  textOverflow
                  whiteSpace
                  overflow="hidden"
                  lineHeight="18px"
                  mxWidth="175px"
                  fSize="14px"
                  fWeight="600"
                >
                  {message ? message : lt_msg_file}
                </Text>
              </Div>
              <Grid gap="16px">
                <Text
                  color="#858585"
                  fWeight="400"
                  fSize="13px"
                  lineHeight="16px"
                >
                  {getTime(time)}
                </Text>
                {newMessagescCount[0].notification > 0 && (
                  <Div
                    width="16px"
                    height="16px"
                    rounded="50%"
                    flex
                    justifycontent="center"
                    alignitems="center"
                    bgc="#4689E3"
                  >
                    <Text
                      color="#fff"
                      fSize="12px"
                      fWeight="600"
                      lineHeight="16px"
                    >
                      {newMessagescCount[0].notification}
                    </Text>
                  </Div>
                )}
              </Grid>
            </Flex>
          )}
        </Flex>
      </Content>
    </CardWrapper>
  );
};

export default Card;
