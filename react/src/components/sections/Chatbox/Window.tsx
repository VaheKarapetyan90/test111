import { FC, useEffect, useState, useRef, Key, useCallback } from "react";
import { Form as AntdForm, Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Loading3QuartersOutlined } from "@ant-design/icons";

import Lottie from "react-lottie";

import MessageBox from "./MessageBox";
import { IWindowProps, Message } from "./types";

import FormGroup from "../Forms/Form";

import { CardWrapper, Wrapper, Image, Text } from "../../general";
import animationData from "../../../animations/typing.json";

import { MessageInputForm } from "../../../helpers/messageInputForm";
import {
  useGetMessagesQuery,
  useLazyGetMessagesByChatIdQuery,
  useSendMessageMutation,
  useStopTypingMutation,
  useTypeingDataQuery,
} from "../../../libs/redux/auth.api";
import { chatState } from "../../meta/Context/ChatProvider";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const antIconsendFile = (
  <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />
);

const Window: FC<IWindowProps> = ({
  messageList,
  messagesFetching,
  messagesLoading,
}) => {
  const {
    loading,
    userInfo,
    messageData: newData,
    setMessageData,
    page,
    opened,
    setPage,
    firstMessage: messageFirst,
    text,
    setText,
    declined,
    setDeclined,
    resize,
    ref,
    parsedData,
  } = chatState();

  const [opneCard, setOpenCard] = useState<boolean>(false);
  const [hover, setHover] = useState(null);
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [seeStatus, setSeeStatus] = useState(null);
  const [showStatus, setShowStatus] = useState(false);

  const [sendMessage, { data: senderMessage }] = useSendMessageMutation();
  const [stopTyping, {}] = useStopTypingMutation();
  const { data: typingData } = useTypeingDataQuery();
  const { data: recipientInfo } = useGetMessagesQuery({
    currentUser: userInfo?.user_id,
    loggedInUser: parsedData?.id,
  });
  const [getMessagesByChatId, { data: infiniteData, isFetching }] =
    useLazyGetMessagesByChatIdQuery();

  const [form] = AntdForm.useForm();

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  useEffect(() => {
    if (messageList?.chat?.chat_status === "declined") {
      setDeclined(true);
    } else {
      setDeclined(false);
    }
  }, [messageList]);

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [recipientInfo, messagesFetching, messagesLoading]);

  useEffect(() => {
    setMessageData([]);
    if (!ref.current) return;
    const { scrollTop, scrollHeight, clientHeight, onscroll } = ref.current;

    ref.current.onscroll = async () => {
      if (ref.current.scrollTop === 0) {
        if (messageList?.user_id === userInfo?.user_id) {
          const pastScroll = scrollHeight;

          await getMessagesByChatId({
            id: messageList?.chat?.chat_id,
            page,
            to: userInfo.user_id,
          });

          const currentScroll = (await ref.current.scrollHeight) - pastScroll;
          await ref.current.scrollTo(0, currentScroll);
          setPage(page + 1);
        }
      }
    };
  }, [page, messageList, userInfo]);

  const handleSeeStatus = useCallback(
    (item: any) => {
      setSeeStatus(item);
    },
    [showStatus]
  );

  const handleHideStatus = useCallback(() => {
    setSeeStatus(null);
  }, [seeStatus]);

  const handleMouseEnter = useCallback(
    (item: any) => {
      setHover(item);
    },
    [hover]
  );

  const handleMouseLeave = useCallback(() => {
    !opneCard && setHover(null);
  }, [hover]);
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (text !== "") {
        setMessageData([
          ...newData,
          {
            sender_id: parsedData?.id,
            name: parsedData?.name,
            picture: parsedData?.picture,
            content: text,
          },
        ]);

        sendMessage({
          content: text,
          to: userInfo?.user_id,
          from: parsedData?.id,
        });
        stopTyping(userInfo?.user_id);
      }
      setText("");
      setEmojiOpen(false);
    }
  };

  const handleSubmit = (value: any) => {
    const { message } = value;

    if (text !== "") {
      setMessageData([
        ...newData,
        {
          sender_id: parsedData?.id,
          name: parsedData?.name,
          picture: parsedData?.picture,
          content: text,
        },
      ]);

      sendMessage({
        content: text,
        to: userInfo?.user_id,
        from: parsedData?.id,
      });
      stopTyping(userInfo?.user_id);
    }
    setText("");
    setEmojiOpen(false);
  };

  let firstMessage: boolean = false;
  let tmpSenderId: any = null;
  const reverseMsg =
    recipientInfo?.length > 0 ? [...recipientInfo].reverse() : [];

  const messageData =
    recipientInfo?.length > 0 ? (
      recipientInfo?.map((item: Message, i: Key | null | undefined) => {
        item?.sender_id !== tmpSenderId
          ? (firstMessage = true)
          : (firstMessage = false);
        item?.sender_id !== tmpSenderId && (tmpSenderId = item.sender_id);
        return (
          <MessageBox
            key={i}
            item={item}
            hover={hover}
            hovered={item.id}
            userInfo={userInfo}
            openCard={opneCard}
            seeStatus={seeStatus}
            showStatus={showStatus}
            setOpenCard={setOpenCard}
            messageList={messageList}
            firstMessage={firstMessage}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            handleSeeStatus={handleSeeStatus}
            handleHideStatus={handleHideStatus}
          />
        );
      })
    ) : (
      <CardWrapper
        bgc="#fff"
        oY="auto"
        padding="10px"
        height={messageFirst ? "calc(100% - 97px)" : "calc(100% - 54px)"}
      ></CardWrapper>
    );

  return (
    <>
      <Wrapper bgc="#fff" height="100%" display=" " position="relative">
        {recipientInfo?.length > 0 ? (
          <CardWrapper
            id="scrollableDiv"
            ref={ref}
            top="0"
            oY="scroll"
            bgc="#fff"
            padding="20px 20px 0 20px"
            mxheight={`${resize && "700px"}`}
            height={`${
              resize && messageFirst
                ? "calc(100vh - 346px)"
                : resize && !messageFirst
                ? "calc(100vh - 303px)"
                : messageFirst
                ? "calc(100% - 112px)"
                : "calc(100% - 72px)"
            }`}
          >
            {isFetching && <Spin indicator={antIcon} />}
            {messagesLoading || messagesFetching ? (
              <Skeleton active />
            ) : (
              messageData
            )}
            {loading && <Spin indicator={antIcon} />}
          </CardWrapper>
        ) : (
          <CardWrapper
            ref={ref}
            top="0"
            oY="auto"
            bgc="#fff"
            padding="20px"
            height={`${
              resize && messageFirst
                ? "calc(100% - 54px)"
                : resize && !messageFirst
                ? "calc(100vh - 289px)"
                : messageFirst
                ? "calc(100% - 98px)"
                : "calc(100% - 58px)"
            }`}
          ></CardWrapper>
        )}

        <FormGroup
          window
          form={form}
          emojiOpen={emojiOpen}
          onFinish={handleSubmit}
          setEmojiOpen={setEmojiOpen}
          formItems={MessageInputForm}
          handleKeyPress={handleKeyPress}
        />
      </Wrapper>
    </>
  );
};

export default Window;
