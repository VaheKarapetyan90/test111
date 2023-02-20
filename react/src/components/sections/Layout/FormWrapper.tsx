import { FC } from "react";

import { WrapperProps } from "./types";

import { Content, Div } from "../../general";

import chatImg from "../../../assets/images/login-bg.jpg";

import { SenseiLogo } from "../../../assets/images/svg-components/senceiLogo";

const FormWrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <Div flex>
      <div style={{ position: "relative" }}>
        <img src={chatImg} alt="" style={{ width: "800px" }} />
        <div
          style={{
            top: "40%",
            right: "40%",
            width: "100px",
            padding: "9px",
            height: "100px",
            borderRadius: "9px",
            textAlign: "center",
            position: "absolute",
            backgroundColor: "#fff",
          }}
        >
          <SenseiLogo />
        </div>
      </div>
      <Content bgc="white" margin="15px 0">
        <Content
          height="0"
          padding=""
          fSize="24px"
          bgc="transparent"
          margin="15px 0 50px 0"
        >
          Sign In
        </Content>
        {children}
      </Content>
    </Div>
  );
};

export default FormWrapper;
