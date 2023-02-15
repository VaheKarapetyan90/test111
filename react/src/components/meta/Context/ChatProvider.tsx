import { createContext, useContext, useRef, useState } from "react";
import { IUserInfo } from "../../sections/Chatbox/types";

type ChatContextProviderProps = {
  children: React.ReactNode;
};

interface IChatState {
  userInfo: any;
  setUserInfo: any;
  active: any;
  setActive: any;
  opened: any;
  setOpened: any;
  collapsed: any;
  setCollapsed: any;
  messageData: any;
  setMessageData: any;
}

const ChatContext = createContext<any>({});

const ChatProvider = ({ children }: ChatContextProviderProps) => {
  const ref: any = useRef(null);
  const [active, setActive] = useState<boolean>(false);
  const [auth, setAuth] = useState(false);
  const [text, setText] = useState<string>("");

  const [opened, setOpened] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [messageData, setMessageData] = useState<any>([]);
  const [firstMessage, setFirstMessage] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [resize, setResize] = useState(false);
  const [notfCount, setNotfCount] = useState(0);
  const [isOnline, setIsOnline] = useState(false);

  const data = localStorage.getItem("auth");
  const parsedData = typeof data === "string" && JSON.parse(data);

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    user_name: "",
    user_picture: "",
    user_position: "",
    user_department: "",
    user_id: null,
    notification: 0,
    chat_id: null,
  });
  return (
    <ChatContext.Provider
      value={{
        userInfo,
        setUserInfo,
        auth,
        setAuth,
        active,
        text,
        setText,
        page,
        notfCount,
        setNotfCount,
        resize,
        ref,
        setResize,
        setPage,
        isOnline,
        setIsOnline,
        declined,
        parsedData,
        setDeclined,
        firstMessage,
        setFirstMessage,
        setActive,
        loading,
        setLoading,
        opened,
        setOpened,
        collapsed,
        setCollapsed,
        messageData,
        setMessageData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
