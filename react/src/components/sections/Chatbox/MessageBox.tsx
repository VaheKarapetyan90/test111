import { FC, useMemo } from "react";

import { MessageBoxProps } from "./types";

import SvgIcon from "../svgIcon";
import MessageStatus from "../MessageStatus";

import {
  Div,
  Text,
  Image,
  FileLink,
  Popover,
  GlobalStyle,
} from "../../general";

import { chatState } from "../../meta/Context/ChatProvider";

import { File } from "../../../assets/images/svg-components/File";
import { Copy } from "../../../assets/images/svg-components/Copy";
import { Edit } from "../../../assets/images/svg-components/Edit";
import { Dots } from "../../../assets/images/svg-components/Dots";
import { Quote } from "../../../assets/images/svg-components/Quote";
import { Forward } from "../../../assets/images/svg-components/Forward";
import { useTime } from "../../../hooks/useTime";
import { createTask } from "../../../assets/images/svg-components/createTask";
import { useInitials } from "../../../hooks/UseInitials";
import { getExtension } from "../../../helpers/getExtention";

const MessageBox: FC<MessageBoxProps> = ({
  item,
  hover,
  userInfo,
  openCard,
  setOpenCard,
  onMouseEnter,
  firstMessage,
  handleSeeStatus,
  handleHideStatus,
}) => {
  const { collapsed, resize, parsedData } = chatState();

  const [hour, minute] = useTime(item.created_at);
  const initials = useInitials(userInfo?.user_name || parsedData?.name);

  const content = (
    <Div>
      <Div
        hover
        flex
        alignitems="center"
        padding="8px 14px"
        cursor="pointer"
        rounded="4px 4px 0 0"
      >
        <SvgIcon Icon={Forward}></SvgIcon>
        <Text
          fSize="14px"
          fWeight="400"
          lineHeight="15px"
          padding="0 0 0 11px"
          color="#000000"
        >
          Forward
        </Text>
      </Div>
      <Div hover flex alignitems="center" padding="8px 14px" cursor="pointer">
        <SvgIcon Icon={Copy}></SvgIcon>
        <Text
          fSize="14px"
          fWeight="400"
          lineHeight="15px"
          padding="0 0 0 11px"
          color="#000000"
        >
          Copy
        </Text>
      </Div>
      <Div hover flex alignitems="center" padding="8px 14px" cursor="pointer">
        <SvgIcon Icon={Edit}></SvgIcon>
        <Text
          fSize="14px"
          fWeight="400"
          lineHeight="15px"
          padding="0 0 0 11px"
          color="#000000"
        >
          Edit
        </Text>
      </Div>
      <Div
        hover
        flex
        alignitems="center"
        padding="8px 14px 8px 14px"
        cursor="pointer"
      >
        <SvgIcon Icon={Quote}></SvgIcon>
        <Text
          fSize="14px"
          fWeight="400"
          lineHeight="15px"
          padding="0 0 0 5px"
          color="#000000"
        >
          Quote message
        </Text>
      </Div>
      <Div
        rounded="0 0 4px 4px"
        hover
        flex
        alignitems="center"
        padding="8px 14px"
        cursor="pointer"
      >
        <SvgIcon Icon={createTask}></SvgIcon>
        <Text
          fSize="14px"
          fWeight="400"
          lineHeight="15px"
          padding="0 0 0 11px"
          color="#000000"
        >
          Create Task
        </Text>
      </Div>
    </Div>
  );

  const memoizedCallback = useMemo(
    () => () => {
      onMouseEnter!(item);
    },
    [item]
  );

  return (
    <Div onMouseLeave={() => handleHideStatus()}>
      {parsedData?.id === item?.sender_id ? (
        <div style={{ position: "relative" }}>
          <Div
            onMouseEnter={memoizedCallback}
            minwidth="150px"
            margin="0 0 23px 0"
            flex
            justifycontent="flex-end"
            alignitems="center"
          >
            {hover === item && (
              <Popover
                overlayStyle={{ paddingRight: 0, paddingLeft: 0 }}
                overlayInnerStyle={{
                  backgroundColor: "#fff",
                  padding: 0,
                }}
                placement="leftTop"
                title={content}
                trigger="click"
              >
                <GlobalStyle />
                <SvgIcon
                  Icon={Dots}
                  margin="0 9px 0 9px"
                  fill="#9E9E9E"
                  onClick={() => {
                    setOpenCard(!openCard);
                  }}
                />
              </Popover>
            )}
            <Div
              // margin="0 0 0 9px"
              mxWidth={`${
                resize && !collapsed
                  ? "650px"
                  : resize && collapsed
                  ? "550px"
                  : !resize && !collapsed
                  ? "460px"
                  : "215px"
              }`}
              flex
              fDirection="column"
            >
              <Div
                bgc={
                  getExtension(item?.file) == "jpg" ||
                  getExtension(item?.file) == "jpeg" ||
                  getExtension(item?.file) == "png" ||
                  getExtension(item?.file) == "gif" ||
                  getExtension(item.file) == "svg" ||
                  getExtension(item?.file) == "tiff"
                    ? "#fff"
                    : "rgba(196, 210, 218, 0.59)"
                }
                rounded="18px 0px  18px 18px"
              >
                {item?.content ? (
                  <>
                    <Text
                      padding="3px 16px 3px 16px"
                      fSize="16px"
                      fWeight="400"
                      lineHeight="20px"
                      owerflowWrap="break-word"
                    >
                      {item?.content}
                    </Text>

                    <Div flex justifycontent="flex-end" padding="0 8px 6px 8px">
                      <Text
                        color="#858585"
                        fSize="12px"
                        fWeight="400"
                        lineHeight="15px"
                        padding="0 0 0 10px "
                      >
                        {`${hour}:${minute} `}
                      </Text>
                      <MessageStatus
                        firstMessage={firstMessage}
                        status={item?.status}
                      />
                    </Div>
                  </>
                ) : getExtension(item.file) == "jpg" ||
                  getExtension(item.file) == "jpeg" ||
                  getExtension(item.file) == "png" ||
                  getExtension(item.file) == "gif" ||
                  getExtension(item.file) == "svg" ||
                  getExtension(item.file) == "tiff" ? (
                  <Div border="1px solid rgb(223, 229, 230)" rounded="3px">
                    <Image
                      src={`/upload/${item?.file}`}
                      alt="img"
                      width="70px"
                      height="70px"
                    />
                    <Div flex justifycontent="flex-end" padding="0 8px 6px 8px">
                      <Text
                        color="#858585"
                        fSize="12px"
                        fWeight="400"
                        lineHeight="15px"
                        padding="0 0 0 10px "
                      >
                        {`${hour}:${minute} `}
                      </Text>
                      <MessageStatus
                        firstMessage={firstMessage}
                        status={item?.status}
                      />
                    </Div>
                  </Div>
                ) : (
                  <>
                    <FileLink
                      padding="3px 16px 3px 16px"
                      display="flex"
                      jContent="center"
                      alignitems="center"
                      align="center"
                      href={`/upload/${item?.file}`}
                      target="_blank"
                    >
                      <SvgIcon Icon={File} width="30px" height="30px"></SvgIcon>
                      <Text
                        color="#373435"
                        mxWidth="200px"
                        owerflowWrap="break-word"
                      >
                        {` ${item?.file}`}
                      </Text>
                    </FileLink>
                    <Div flex justifycontent="flex-end" padding="0 8px 6px 8px">
                      <Text
                        color="#858585"
                        fSize="12px"
                        fWeight="400"
                        lineHeight="15px"
                        padding="0 0 0 10px "
                      >
                        {`${hour}:${minute} `}
                      </Text>
                      <MessageStatus
                        firstMessage={firstMessage}
                        status={item?.status}
                      />
                    </Div>
                  </>
                )}
              </Div>
            </Div>
          </Div>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          {firstMessage && (
            <Div flex>
              {userInfo?.user_picture ? (
                <Div
                  width="50px"
                  flex
                  alignitems="center"
                  justifycontent="center"
                ></Div>
              ) : (
                <Div
                  rounded="50%"
                  flex
                  alignitems="center"
                  justifycontent="center"
                  width="30px"
                  height="30px"
                  bgc={`#C9BBD0`}
                >
                  {initials}
                </Div>
              )}
            </Div>
          )}
          <Div
            margin="0 0 23px 0"
            onMouseEnter={memoizedCallback}
            flex
            justifycontent="flex-start"
            alignitems="center"
          >
            <Div>
              <Div
                // margin="0 9px 0 0"
                mxWidth={`${
                  resize && !collapsed
                    ? "650px"
                    : resize && collapsed
                    ? "550px"
                    : !resize && !collapsed
                    ? "460px"
                    : "215px"
                }`}
                flex
                fDirection="column"
                bgc={
                  getExtension(item?.file) == "jpg" ||
                  getExtension(item?.file) == "jpeg" ||
                  getExtension(item?.file) == "png" ||
                  getExtension(item?.file) == "gif" ||
                  getExtension(item?.file) == "svg" ||
                  getExtension(item?.file) == "tiff"
                    ? "#fff"
                    : "#E1E3F1"
                }
                rounded="0 18px 18px 18px"
              >
                {item?.content ? (
                  <>
                    <Text
                      padding="3px 16px 3px 16px"
                      owerflowWrap="break-word"
                      fSize="16px"
                      fWeight="400"
                      lineHeight="20px"
                    >
                      {item?.content}
                    </Text>
                    <Div flex justifycontent="flex-end" padding="0 8px 6px 8px">
                      <Text
                        color="#858585"
                        fSize="12px"
                        fWeight="400"
                        lineHeight="15px"
                      >
                        {`${hour}:${minute} `}
                      </Text>
                    </Div>
                  </>
                ) : getExtension(item.file) == "jpg" ||
                  getExtension(item.file) == "jpeg" ||
                  getExtension(item.file) == "png" ||
                  getExtension(item.file) == "gif" ||
                  getExtension(item.file) == "svg" ||
                  getExtension(item.file) == "tiff" ? (
                  <Div border="1px solid rgb(223, 229, 230)" rounded="3px">
                    <Image
                      src={`/upload/${item?.file}`}
                      alt="img"
                      width="70px"
                      height="70px"
                    />
                    <Div flex justifycontent="flex-end" padding="0 8px 6px 8px">
                      <Text
                        color="#858585"
                        fSize="12px"
                        fWeight="400"
                        lineHeight="15px"
                        padding="0 0 0 10px "
                      >
                        {`${hour}:${minute} `}
                      </Text>
                    </Div>
                  </Div>
                ) : (
                  <>
                    <FileLink
                      padding="3px 16px"
                      display="flex"
                      jContent="center"
                      alignitems="center"
                      align="center"
                      href={`/upload/${item?.file}`}
                      target="_blank"
                    >
                      <SvgIcon Icon={File} width="30px" height="30px"></SvgIcon>
                      <Text
                        color="#373435"
                        mxWidth="200px"
                        owerflowWrap="break-word"
                      >{` ${item?.file}`}</Text>
                    </FileLink>
                    <Div flex justifycontent="flex-end" padding="0 8px 6px 8px">
                      <Text
                        color="#858585"
                        fSize="12px"
                        fWeight="400"
                        lineHeight="15px"
                        padding="0 0 0 10px "
                      >
                        {`${hour}:${minute} `}
                      </Text>
                    </Div>
                  </>
                )}
              </Div>
            </Div>

            {hover === item && (
              <Popover
                overlayStyle={{ paddingRight: 0, paddingLeft: 0 }}
                overlayInnerStyle={{ backgroundColor: "#fff", padding: 0 }}
                placement="rightTop"
                title={content}
                trigger="click"
              >
                <GlobalStyle />
                <SvgIcon
                  zIndx="9999"
                  Icon={Dots}
                  margin="0 9px 0 9px"
                  fill="#9E9E9E"
                  onClick={() => {
                    setOpenCard(!openCard);
                  }}
                />
              </Popover>
            )}
          </Div>
        </div>
      )}
    </Div>
  );
};
export default MessageBox;
