import { ShrinkOutlined } from "@ant-design/icons";
import React, { FC, useEffect, useState } from "react";

import { ChatBoxNavProps } from "./types";

import SvgIcon from "../svgIcon";

import { Close } from "../../../assets/images/svg-components/Close";
import { Minus } from "../../../assets/images/svg-components/Minus";
import { Search } from "../../../assets/images/svg-components/Search";
import { ResizeChat } from "../../../assets/images/svg-components/ResizeChat";
import { Notification } from "../../../assets/images/svg-components/Notification";
import { NotificationFill } from "../../../assets/images/svg-components/NotificationFill";
import { Content, Text, Flex, InputSimple, Div } from "../../general";
import { chatState } from "../../meta/Context/ChatProvider";
import { useDebaunce } from "../../../hooks/useDebaunce";
import {
  useGetUsersQuery,
  useLazyGetUsersQuery,
} from "../../../libs/redux/auth.api";

const ChatboxNav: FC<ChatBoxNavProps> = ({ active, setActive }) => {
  var count = 0;
  const {
    search,
    resize,
    userInfo,
    setResize,
    notfCount,
    setSearch,
    setNotfCount,
  } = chatState();

  const { data } = useGetUsersQuery(userInfo.user_id);

  const [getUsers, { data: searchedData }] = useLazyGetUsersQuery();

  const debaunced = useDebaunce(search, 1000);

  useEffect(() => {
    if (debaunced.length >= 0) {
      getUsers(search);
    }
  }, [debaunced]);

  useEffect(() => {
    setNotfCount(count);
  }, [data]);

  data?.usersAndChats?.forEach(({ id, notification }: any) => {
    count = count + Number(notification);
    return count;
  });

  return (
    <>
      {!resize ? (
        <Content height=" " textAlign=" " margin=" ">
          <Flex justifycontent="space-between">
            <Text>Chat</Text>

            <Flex>
              <SvgIcon
                Icon={Minus}
                width="14px"
                margin={"0 23px 0 0"}
                onClick={() => {
                  setActive(false);
                }}
              />
              <SvgIcon
                Icon={ResizeChat}
                width="14px"
                margin={"0 23px 0 0"}
                onClick={() => {
                  setResize(!resize);
                }}
              />
              <SvgIcon
                Icon={Close}
                width="14px"
                onClick={() => {
                  setActive(false);
                }}
              />
            </Flex>
          </Flex>
          <Div flex alignitems="center" margin="10px 0 0 0">
            <Div position="relative">
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
            <InputSimple
              onChange={(e: { target: { value: string } }) => {
                setSearch(e.target.value);
              }}
              value={search}
              placeholder="Search"
              margin="0 0  0 20px"
              prefix={<Search />}
            />
          </Div>
        </Content>
      ) : (
        <Content
          cursor="pointer"
          display="flex"
          jContent="flex-end"
          bgc="#8B9FAD"
          height="78px"
          width="100%"
          mxWidth=" "
          margin=" "
        >
          <ShrinkOutlined
            onClick={() => {
              setResize(!resize);
            }}
          />
        </Content>
      )}
    </>
  );
};

export default ChatboxNav;
