import React, { FC, useState, useRef } from "react";
import { Form, Input, Flex, Button, Div, EmojiPicker } from "../../general";
import { Form as AntdForm, InputRef, Spin } from "antd";
import type { UploadFile } from "antd/es/upload/interface";

import { FormProps } from "./types";
import SvgIcon from "../svgIcon";
import { Attach } from "../../../assets/images/svg-components/Attach";
import { Emoji } from "../../../assets/images/svg-components/Emoji";
import { Send } from "../../../assets/images/svg-components/Send";
import { Upload } from "antd";
import {
  useSendFileMutation,
  useStopTypingMutation,
  useTypeingDataQuery,
  useTypingMutation,
} from "../../../libs/redux/auth.api";
import { useEffect } from "react";
import { chatState } from "../../meta/Context/ChatProvider";
import data from "@emoji-mart/data";

import Picker from "@emoji-mart/react";

const FormGroup: FC<FormProps> = ({
  onFinish,
  emojiOpen,
  form,
  setEmojiOpen,
  onFinishFailed,
  window,
  formItems,
}) => {
  const { userInfo, setLoading, text, setText, firstMessage, resize } =
    chatState();

  const [file, setFile] = useState("");
  const [query, setQuery] = useState("");
  const [typing, {}] = useTypingMutation();
  const [sendFile, {}] = useSendFileMutation();
  const [stopTyping, {}] = useStopTypingMutation();
  const { data: typingData } = useTypeingDataQuery();
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
      setLoading(false);
    }
    if (file.status === "error") {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      stopTyping(userInfo?.user_id);
    }, 2000);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const onEmojiClick = (emojiObject: any) => {
    const cursor: any = inputRef.current;
    cursor.focus();

    const start = text.substring(0, cursor.selectionStart);
    const end = text.substring(cursor.selectionStart);
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
                right={`${resize ? "0" : ""}`}
                left={`${!resize ? "0" : ""}`}
                zIndex="100"
                margin="0 30px 0 0 "
                position="absolute"
              >
                <EmojiPicker
                  showPreview={false}
                  showSkinTones={false}
                  emojiTooltip={true}
                  data={data}
                  onEmojiSelect={onEmojiClick}
                />
              </Div>
            )}
            <input
              ref={inputRef}
              onChange={handleTyping}
              style={{
                height: "100%",
                maxHeight: "76px",
                margin: "0",
                borderRadius: "9px 9px 0 0",
                width: "100%",
                border: "1px solid #DFE5E6",
                padding: "14px",
                fontFamily: "Source Sans Pro",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "20px",
              }}
              // disabled={firstMessage ? true : false}
              value={text}
              name={name}
              placeholder="Write a message..."
            />
          </Div>
        ) : (
          <Input border="1px solid #c5c5c5" ref={inputRef} />
        )}
      </Form.Item>
    );
  });
  return (
    <Form
      form={form}
      width="100%"
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      labelCol={{ span: 6 }}
      padding="0 20px 0 20px"
      wrapperCol={{ span: 14 }}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
    >
      {items}

      <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
        {window ? (
          <Div
            bgc="#EBEBEB"
            padding="10px 15px 8px 15px"
            rounded="0 0 9px  9px"
          >
            <Flex justifycontent="space-between">
              <Upload
                defaultFileList={[...(defaultFileList as [])]}
                showUploadList={false}
                name="file"
                onChange={handleChange}
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
                  // disabled={firstMessage ? true : false}
                  htmlType="submit"
                  width="30px"
                  height="30px"
                  bgc="#FFC700"
                  padding="7px"
                  margin="0"
                  radius="3px"
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
  );
};

export default FormGroup;
