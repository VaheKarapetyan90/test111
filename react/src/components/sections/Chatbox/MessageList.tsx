import { Skeleton } from "antd";
import { FC, useState, useEffect } from "react";

import { MessageListProps } from "./types";

import Card from "../Card";
import SvgIcon from "../svgIcon";

import { Dots } from "../../../assets/images/svg-components/Dots";
import { Edit } from "../../../assets/images/svg-components/Edit";
import { Union } from "../../../assets/images/svg-components/Union";

import { chatState } from "../../meta/Context/ChatProvider";
import { IGroupChat, IUsersAndChat } from "../../../libs/types";
import {
  useGetUsersQuery,
  useLazyGetUsersQuery,
} from "../../../libs/redux/auth.api";
import { Search } from "../../../assets/images/svg-components/Search";
import { UnionClosed } from "../../../assets/images/svg-components/UnionClosed";
import { Notification } from "../../../assets/images/svg-components/Notification";
import { NotificationFill } from "../../../assets/images/svg-components/NotificationFill";
import {
  Div,
  Flex,
  Text,
  Input,
  Popover,
  Content,
  CardWrapper,
  GlobalStyle,
} from "../../general";
import { useDebaunce } from "../../../hooks/useDebaunce";
import PopoverContent from "../PopoverContent";

const MessageList: FC<MessageListProps> = ({
  data: singleData,
  handleGetMessages,
  usersQueryData,
}) => {
  const {
    opened,
    setOpened,
    userInfo,
    collapsed,
    setCollapsed,
    resize,
    notfCount,
    search,
    setSearch,
  } = chatState();


  const [getUsers, { isFetching }] = useLazyGetUsersQuery();

  const debaunced = useDebaunce(search, 1000);

  useEffect(() => {
    if (debaunced.length >= 0) {
      getUsers(search);
    }
  }, [debaunced]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const userMessages =
    usersQueryData &&
    usersQueryData?.usersAndChats.map(
      ({
        id,
        chat_id,
        user_position,
        user_name,
        chat_type,
        user_picture,
        latest_message,
        user_department,
        notification,
        chat_created_at,
        lt_msg_file,
      }: IUsersAndChat) => {
        return (
          <Card
            id={id}
            key={id}
            opened={opened}
            name={user_name}
            userInfo={userInfo}
            collapsed={collapsed}
            setOpened={setOpened}
            chat_type={chat_type}
            time={chat_created_at}
            message={latest_message}
            lt_msg_file={lt_msg_file}
            current_chat_id={chat_id}
            onClick={handleGetMessages}
            user_picture={user_picture}
            notification={notification}
            user_position={user_position}
            user_department={user_department}
            chat_id={singleData?.chat?.chat_id}
            activeUser={usersQueryData?.activeUserIds.includes(id)}
          />
        );
      }
    );

  const groupMessages =
    usersQueryData &&
    usersQueryData?.groupChats.map(
      ({
        chat_id,
        chat_name,
        chat_type,
        user_picture,
        notification,
        user_department,
        chat_created_at,
      }: IGroupChat) => {
        return (
          <Card
            id={chat_id}
            opened={opened}
            name={chat_name}
            key={Math.random()}
            userInfo={userInfo}
            chat_type={chat_type}
            collapsed={collapsed}
            setOpened={setOpened}
            time={chat_created_at}
            current_chat_id={chat_id}
            notification={notification}
            user_picture={user_picture}
            onClick={handleGetMessages}
            chat_id={singleData?.chat_id}
            user_department={user_department}
          />
        );
      }
    );

  return (
    <Content
      bgc="#fff"
      padding=" "
      textAlign=" "
      mnWidth="65px"
      margin="0 0 30px 0"
      transition="width 0.1s"
      height={`${resize && "100%"}`}
      borderR={resize ? "5px solid #F5F5F5" : "1px solid #F5F5F5"}
      mxWidth={`${
        resize && collapsed
          ? "378px"
          : !resize && collapsed
          ? "330px"
          : resize && !collapsed
          ? "75px"
          : "65px"
      }`}
      width={`${
        resize && collapsed
          ? "100%"
          : !resize && collapsed
          ? "320px"
          : resize && !collapsed
          ? "75px"
          : "65px"
      }`}
    >
      <Div padding="20px 20px 20px 20px" borderb="1px solid #ABC2DA">
        <Flex justifycontent="space-between">
          <Div flex alignitems="center">
            <SvgIcon
              width="26px"
              height="18px"
              onClick={toggleCollapsed}
              Icon={collapsed ? Union : UnionClosed}
            />

            {resize && collapsed && (
              <Div position="relative" margin="0 0 0 17px">
                {notfCount > 0 ? (
                  <SvgIcon
                    width="16px"
                    height="16px"
                    margin="0 0 0 5px"
                    Icon={NotificationFill}
                  />
                ) : (
                  <SvgIcon
                    width="16px"
                    height="16px"
                    margin="0 0 0 5px"
                    Icon={Notification}
                  />
                )}
                {notfCount > 0 && (
                  <Div
                    flex
                    bottom="18px"
                    left="18px"
                    width="15px"
                    height="15px"
                    rounded="50%"
                    bgc="#4689E3"
                    position="absolute"
                    alignitems="center"
                    justifycontent="center"
                  >
                    <Text
                      fSize="12px"
                      fWeight="600"
                      align="center"
                      lineHeight="16px"
                    >
                      {notfCount}
                    </Text>
                  </Div>
                )}
              </Div>
            )}
          </Div>
          {collapsed && (
            <Flex>
              <Popover
                trigger="click"
                title={PopoverContent}
                placement="bottomRight"
                overlayInnerStyle={{ backgroundColor: "#fff", padding: 0 }}
              >
                <GlobalStyle />
                <SvgIcon
                  width="2px"
                  Icon={Dots}
                  fill="#9E9E9E"
                  margin="0 21px 0 0"
                />
              </Popover>
              <SvgIcon Icon={Edit} />
            </Flex>
          )}
        </Flex>
        {resize && collapsed && (
          <Div padding="23px 0 0 0 ">
            <Input
              radius="8px"
              value={search}
              placeholder="Search"
              border="1px solid #A5A5A5"
              suffix={<SvgIcon Icon={Search}></SvgIcon>}
              onChange={(e: { target: { value: string } }) => {
                setSearch(e.target.value);
              }}
            />
          </Div>
        )}
      </Div>
      <Div
        oY="auto"
        mxheight="648px"
        height={`${
          resize && collapsed
            ? "calc(100vh - 198px)"
            : resize && !collapsed
            ? "calc(100vh - 143px)"
            : !resize && collapsed
            ? "calc(100vh - 230px)"
            : "calc(100vh - 222px)"
        }`}
      >
        {isFetching ? <Skeleton active /> : userMessages}
        {isFetching ? <Skeleton active /> : groupMessages}

        {usersQueryData === false && !usersQueryData && (
          <>
            <Div>
              <CardWrapper
                bgc="#fff"
                borderb="1px solid #ABC2DA"
                padding="14px 12px 20px 20px"
              >
                <Text fWeight="600" fSize="16px" lineHeight="20px">
                  Message requests
                </Text>

                <Text
                  fSize="14px"
                  fWeight="400"
                  lineHeight="18px"
                  padding="14px 0 0"
                >
                  Message requests are from people your’re not connected with
                  and require your approval
                </Text>
              </CardWrapper>
              <Text
                fSize="16px"
                fWeight="400"
                align="center"
                lineHeight="20px"
                padding="113px 0 0 0 "
              >
                No Message
              </Text>
            </Div>
          </>
        )}
      </Div>
    </Content>
  );
};

export default MessageList;
