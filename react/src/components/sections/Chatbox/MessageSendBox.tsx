import React, { useState } from "react";
import { Input, Button,Form } from "antd";
import { Div } from "../../general";
import { Send } from "../../../assets/images/svg-components/Send";

const { TextArea } = Input;

const MessageSendBox = () => {
  const onFinish = (val: any) => {
  };
  return (
    <>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        autoComplete="off"
      >
        <Form.Item name="message">
          <TextArea rows={4} />
          <Div bgc="#EBEBEB">
            <Button
              type="primary"
              style={{ backgroundColor: "yellow" }}
              htmlType="submit"
            >
              <Send />
            </Button>
          </Div>
        </Form.Item>
        <Form.Item></Form.Item>
      </Form>
    </>
  );
};
export default MessageSendBox;
