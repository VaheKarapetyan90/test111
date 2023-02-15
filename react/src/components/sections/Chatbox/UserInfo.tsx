import _ from "lodash";
import { FC, useEffect, useLayoutEffect, useState } from "react";

import SvgIcon from "../svgIcon";

import { UserInfoProps } from "./types";

import MuteUnmute from "../MuteAnmute";
import { getTime } from "../../../helpers/getTime";
import { chatState } from "../../meta/Context/ChatProvider";
import { Mute } from "../../../assets/images/svg-components/Mute";
import { Search } from "../../../assets/images/svg-components/Search";
import { Approve } from "../../../assets/images/svg-components/Approve";
import { Decline } from "../../../assets/images/svg-components/Decline";
import { MutedNotf } from "../../../assets/images/svg-components/MutedNotf";
import {
  CardWrapper,
  Flex,
  Div,
  Image,
  Text,
  Span,
  Button,
  Popover,
  GlobalStyle,
} from "../../general";

import {
  useAnswerToChatRequestMutation,
  useGetMessagesInfoQuery,
  useGetMessagesQuery,
} from "../../../libs/redux/auth.api";

const UserInfo: FC<UserInfoProps> = ({ data }) => {
  let {
    userInfo,
    firstMessage,
    setFirstMessage,
    setDeclined,
    page,
    parsedData,
  } = chatState();

  const [open, setOpen] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [requestAnswer, setRequesrAnswer] = useState<string>("");

  const [answerToChatRequest, { data: answerData }] =
    useAnswerToChatRequestMutation();
  const { data: recipientInfo } = useGetMessagesQuery({
    currentUser: userInfo?.user_id,
    loggedInUser: parsedData?.id,
  });

  let show = false;

  const loggedinUserId = parsedData?.id;

  useEffect(() => {
    if (data?.user_id === userInfo?.user_id) {
      if (_.isEmpty(data.chat) && !_.isEmpty(recipientInfo)) {
        if (
          recipientInfo?.every((msg: { sender_id: number }) => {
            return msg.sender_id !== loggedinUserId;
          })
        ) {
          show = true;
        }
      } else if (
        // TODO chat.group_admin_id !== loggedinUserId
        data?.chat?.chat_status === "not-selected" &&
        recipientInfo?.every((msg: { sender_id: number }) => {
          return msg.sender_id !== loggedinUserId;
        })
      ) {
        show = true;
      } else {
        show = false;
      }
    }
    setFirstMessage(show);
  }, [data, recipientInfo]);

  const approveOrDecline = (answer: string) => {
    answerToChatRequest({
      from: loggedinUserId,
      status: answer,
      to: userInfo?.user_id,
    });

    setRequesrAnswer(answer);
    setFirstMessage(false);

    if (answer === "declined") {
      setDeclined(true);
    }
  };

  return (
    <CardWrapper
      width="100%"
      height="100%"
      bgc="#F5F7F9"
      mxheight={firstMessage ? "126px" : "77px"}
      padding="8px 20px 0 20px"
      borderB="1px solid #D9D9D9"
    >
      <Flex justifycontent="space-between">
        <Flex>
          <>
            <Image
              preview={false}
              width="40px"
              height="40px"
              rounded="50%"
              src={userInfo?.user_picture}
            />

            <Div padding="0 0 0 15px">
              <Text align="left" fSize="16px" lineHeight="20px" fWeight="600">
                {userInfo?.user_name}
              </Text>

              <Text
                overflow="hidden"
                textOverflow
                whiteSpace
                padding="0"
                align="left"
                color={"#373435"}
                mxWidth="189px"
                fWeight="400"
                fSize="14px"
                lineHeight="20px"
              >
                {userInfo?.user_department && (
                  <Span
                    color="#858585"
                    fWeight="400"
                    fSize="14px"
                    lineHeight="20px"
                  >{`${userInfo?.user_department} | `}</Span>
                )}
                {`${userInfo?.user_position}`}
              </Text>
              <Text
                height="16px"
                align="left"
                color="#858585"
                fSize="13px"
                lineHeight="16px"
                fWeight="400"
              >
                {data?.userStatus && data?.userStatus?.active === false
                  ? `Last seen ${getTime(data?.userStatus?.last_seen)}`
                  : data?.userStatus && data?.userStatus?.active === true
                  ? `Active`
                  : ""}
              </Text>
            </Div>
          </>
        </Flex>
        <Flex alignitems="space-between">
          <SvgIcon
            Icon={Search}
            width="16px"
            height="16px"
            margin="0 12px 0 0 "
          />

          <Popover
            overlayInnerStyle={{ backgroundColor: "#fff", padding: 0 }}
            placement="bottomRight"
            title={<MuteUnmute setMute={setMute} setOpen={setOpen} />}
            trigger="click"
          >
            <GlobalStyle />
            {mute ? (
              <SvgIcon
                onClick={() => {
                  setOpen(!open);
                }}
                Icon={MutedNotf}
                width="16px"
                height="16px"
                margin="0 12px 0 0 "
              />
            ) : (
              <SvgIcon
                onClick={() => {
                  setOpen(!open);
                }}
                Icon={Mute}
                width="16px"
                height="16px"
                margin="0 12px 0 0 "
              />
            )}
          </Popover>
        </Flex>
      </Flex>

      {firstMessage && (
        <Div flex alignitems="center" justifycontent="flex-start" height="55px">
          <Button
            onClick={() => approveOrDecline("accepted")}
            margin="0 10px 0 0 "
            display="flex"
            alignitem="center"
            justifycontent="center"
            bgc="transparent"
            border="1px solid #373435"
            radius="3px"
            width="153px"
            height="35px"
          >
            <SvgIcon Icon={Approve} margin="0 11px 0 0 "></SvgIcon>
            <Text color="#55BC25">Approve</Text>
          </Button>

          <Button
            onClick={() => approveOrDecline("declined")}
            display="flex"
            alignitem="center"
            justifycontent="center"
            bgc="transparent"
            border="1px solid #373435"
            radius="3px"
            width="153px"
            height="35px"
          >
            <SvgIcon Icon={Decline} margin="0 11px 0 0 "></SvgIcon>
            <Text color="#FF8686">Decline</Text>
          </Button>
        </Div>
      )}
    </CardWrapper>
  );
};

export default UserInfo;
