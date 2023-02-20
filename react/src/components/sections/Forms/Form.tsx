import { Upload } from "antd";
import { useEffect } from "react";
import { FC, useState, useRef } from "react";
import type { UploadFile } from "antd/es/upload/interface";

import Lottie from "react-lottie";
import data from "@emoji-mart/data";

import { FormProps } from "./types";

import SvgIcon from "../svgIcon";
import TextArea from "../../general/textArea";

import { Form, Input, Flex, Button, Div, EmojiPicker } from "../../general";

import animationData from "../../../animations/typing.json";

import { Send } from "../../../assets/images/svg-components/Send";
import { Emoji } from "../../../assets/images/svg-components/Emoji";
import { Attach } from "../../../assets/images/svg-components/Attach";
import { chatState } from "../../meta/Context/ChatProvider";
import {
  useSendFileMutation,
  useStopTypingMutation,
  useTypeingDataQuery,
  useTypingMutation,
} from "../../../libs/redux/auth.api";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const FormGroup: FC<FormProps> = ({
  onFinish,
  emojiOpen,
  form,
  setEmojiOpen,
  onFinishFailed,
  window,
  formItems,
  handleKeyPress,
}) => {
  const { userInfo, setLoading, text, setText, resize } = chatState();

  const [file, setFile] = useState("");
  const [query, setQuery] = useState("");
  const [typing, {}] = useTypingMutation();
  const [stopTyping, {}] = useStopTypingMutation();
  const { data: typingData } = useTypeingDataQuery();
  const [sendFile, { isLoading }] = useSendFileMutation();
  const [defaultFileList, setDefultFileList] = useState<UploadFile[]>([]);

  const authData: string | any = localStorage.getItem("auth");
  const loggedInUser = JSON.parse(authData);
  const loggedInUserId = loggedInUser?.id;

  const inputRef = useRef<any>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (inputRef.current) {
        stopTyping(userInfo?.user_id);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleChange = async ({ file }: { file: any }) => {
    setDefultFileList([...defaultFileList, file]);
    setFile(file);

    if (file.status === "uploading") {
      setLoading(true);
    }
    if (file.status === "done") {
      sendFile({ content: file, to: userInfo?.user_id, from: loggedInUserId });
    }
    if (file.status === "error") {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      stopTyping(userInfo?.user_id);
    }, 2000);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const onEmojiClick = (emojiObject: any) => {
    const cursor: any = inputRef.current;
    cursor.focus();
    const start = text.substring(
      0,
      cursor.resizableTextArea.textArea.selectionStart
    );
    const end = text.substring(
      cursor.resizableTextArea.textArea.selectionStart
    );
    const msg = start + `${emojiObject.native}` + end;
    setText(msg);
  };

  function handleTyping(e: any) {
    setText(e.target.value);
    setQuery(e.target.value);
    typing(userInfo?.user_id);
    setEmojiOpen(false);
  }

  const items = formItems?.map(({ label, name, rules, id }) => {
    return (
      <Form.Item label={label} name={name} rules={rules} key={id}>
        {name === "password" ? (
          <Input.Password />
        ) : window ? (
          <Div>
            {emojiOpen && (
              <Div
                bottom="55px"
                zIndex="100"
                margin="0 30px 0 0 "
                position="absolute"
                right={`${resize ? "0" : ""}`}
                left={`${!resize ? "0" : ""}`}
              >
                <EmojiPicker
                  data={data}
                  emojiTooltip={true}
                  showPreview={false}
                  showSkinTones={false}
                  onEmojiSelect={onEmojiClick}
                />
              </Div>
            )}
            <TextArea
              name={name}
              width="100%"
              height="100%"
              value={text}
              ref={inputRef}
              mxheight="76px"
              borderb="none"
              onChange={handleTyping}
              border="1px solid #DFE5E6"
              onPressEnter={handleKeyPress}
              placeholder="Write a message..."
              autoSize={{ minRows: 2, maxRows: 2 }}
            />
          </Div>
        ) : (
          <Input border="1px solid #c5c5c5" ref={inputRef} />
        )}
      </Form.Item>
    );
  });

  return (
    <>
      <Form
        form={form}
        width="100%"
        name="basic"
        autoComplete="off"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        padding="0 20px 0 20px"
        wrapperCol={{ span: 14 }}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
      >
        {typingData?.sender_id === userInfo?.user_id && typingData?.typing ? (
          <div
            style={{
              height: "14px",
            }}
          >
            <Lottie
              width={75}
              options={defaultOptions}
              style={{ margin: "0px 0px 0px -20px" }}
            />
          </div>
        ) : (
          <div
            style={{
              height: "14px",
            }}
          ></div>
        )}
        {items}

        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          {window ? (
            <Div
              borderT="none"
              bgc="#EBEBEB"
              rounded="0 0 9px  9px"
              border="1px solid #DFE5E6"
              padding="10px 15px 8px 15px"
            >
              <Flex justifycontent="space-between">
                <Upload
                  name="file"
                  showUploadList={false}
                  onChange={handleChange}
                  defaultFileList={[...(defaultFileList as [])]}
                  customRequest={({ file, onSuccess }: any) => {
                    setTimeout(() => {
                      onSuccess("ok");
                    }, 0);
                  }}
                >
                  {<SvgIcon Icon={Attach} />}
                </Upload>

                <Flex alignitems="center">
                  <SvgIcon
                    Icon={Emoji}
                    margin="0 20px 0  0"
                    onClick={() => {
                      setEmojiOpen(!emojiOpen);
                    }}
                  ></SvgIcon>
                  <Button
                    margin="0"
                    radius="3px"
                    width="30px"
                    height="30px"
                    bgc="#FFC700"
                    padding="7px"
                    htmlType="submit"
                  >
                    <SvgIcon Icon={Send} />
                  </Button>
                </Flex>
              </Flex>
            </Div>
          ) : (
            <Button type="primary" htmlType="submit">
              {"Submit"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default FormGroup;
