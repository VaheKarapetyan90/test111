import { Skeleton } from "antd";
import { FC, useState, useRef, useEffect } from "react";

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

const content = (
  <div>
    <Div rounded="4px 4px 0 0" cursor="pointer" hover padding=" 10px">
      <Text
        align="left"
        fSize="16px"
        fWeight="400"
        lineHeight="20px"
        color="#000"
      >
        Chat request
      </Text>
    </Div>
    <Div cursor="pointer" hover padding=" 10px">
      <Text
        align="left"
        fSize="16px"
        fWeight="400"
        lineHeight="20px"
        color="#000"
      >
        Decined Chat request
      </Text>
    </Div>
    <Div rounded="0 0 4px 4px" cursor="pointer" hover padding="10px">
      <Text
        align="left"
        fSize="16px"
        fWeight="400"
        lineHeight="20px"
        color="#000"
      >
        Archive chats
      </Text>
    </Div>
  </div>
);

const MessageList: FC<MessageListProps> = ({
  data: singleData,
  handleGetMessages,
  usersQueryData,
  usersQueryLoading,
}) => {
  const {
    opened,
    setOpened,
    userInfo,
    collapsed,
    setCollapsed,
    resize,
    notfCount,
  } = chatState();

  const [search, setSearch] = useState("");

  const {} = useGetUsersQuery(userInfo?.user_id);

  const [getUsers, {}] = useLazyGetUsersQuery();

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
            key={id}
            activeUser={usersQueryData?.activeUserIds.includes(id)}
            id={id}
            lt_msg_file={lt_msg_file}
            current_chat_id={chat_id}
            chat_id={singleData?.chat?.chat_id}
            userInfo={userInfo}
            notification={notification}
            opened={opened}
            user_department={user_department}
            name={user_name}
            user_position={user_position}
            collapsed={collapsed}
            setOpened={setOpened}
            chat_type={chat_type}
            time={chat_created_at}
            message={latest_message}
            onClick={handleGetMessages}
            user_picture={user_picture}
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
            notification={notification}
            chat_id={singleData?.chat_id}
            current_chat_id={chat_id}
            opened={opened}
            userInfo={userInfo}
            name={chat_name}
            user_department={user_department}
            key={Math.random()}
            chat_type={chat_type}
            collapsed={collapsed}
            setOpened={setOpened}
            time={chat_created_at}
            user_picture={user_picture}
            onClick={handleGetMessages}
          />
        );
      }
    );

  return (
    <Content
      bgc="#fff"
      padding=" "
      textAlign=" "
      margin="0 0 30px 0"
      transition="width 0.1s"
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
      height={`${resize && "100%"}`}
    >
      <Div padding="20px 20px 20px 20px" borderB="1px solid #ABC2DA">
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
                    Icon={NotificationFill}
                    width="16px"
                    height="16px"
                    margin="0 0 0 5px"
                  />
                ) : (
                  <SvgIcon
                    Icon={Notification}
                    width="16px"
                    height="16px"
                    margin="0 0 0 5px"
                  />
                )}
                {notfCount > 0 && (
                  <Div
                    position="absolute"
                    bottom="18px"
                    left="18px"
                    width="15px"
                    height="15px"
                    rounded="50%"
                    bgc="#4689E3"
                    flex
                    justifycontent="center"
                    alignitems="center"
                  >
                    <Text
                      fSize="12px"
                      fWeight="600"
                      lineHeight="16px"
                      align="center"
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
                overlayInnerStyle={{ backgroundColor: "#fff", padding: 0 }}
                placement="bottomRight"
                title={content}
                trigger="click"
              >
                <GlobalStyle />
                <SvgIcon
                  width="2px"
                  Icon={Dots}
                  margin="0 21px 0 0"
                  fill="#9E9E9E"
                />
              </Popover>
              <SvgIcon Icon={Edit} />
            </Flex>
          )}
        </Flex>
        {resize && collapsed && (
          <Div padding="23px 0 0 0 ">
            <Input
              onChange={(e: { target: { value: string } }) => {
                setSearch(e.target.value);
              }}
              value={search}
              placeholder="Search"
              radius="8px"
              border="1px solid #A5A5A5"
              suffix={<SvgIcon Icon={Search}></SvgIcon>}
            />
          </Div>
        )}
      </Div>
      <Div
        height={`${
          resize && collapsed
            ? "calc(100vh - 198px)"
            : resize && !collapsed
            ? "calc(100vh - 143px)"
            : !resize && collapsed
            ? "calc(100vh - 230px)"
            : "calc(100vh - 222px)"
        }`}
        mxheight="648px"
        oY="auto"
      >
        {usersQueryLoading && <Skeleton active />}
        {userMessages}
        {groupMessages}

        {usersQueryData === false && !usersQueryData && (
          <>
            <Div>
              <CardWrapper
                bgc="#fff"
                borderB="1px solid #ABC2DA"
                padding="14px 12px 20px 20px"
              >
                <Text fWeight="600" fSize="16px" lineHeight="20px">
                  Message requests
                </Text>

                <Text
                  fSize="14px"
                  fWeight="400"
                  lineHeight="18px"
                  padding="14px 0 0 "
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
