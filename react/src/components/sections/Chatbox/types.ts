export interface UserStatus {}

export interface Chat {
  chat_id: number;
  chat_status: string;
  chat_created_at: Date;
  messages: Message[];
}

export interface RootObject {
  userStatus: UserStatus;
  chat: Chat;
}

export interface Message {
  id: number;
  content?: string;
  file?: any;
  sender_id: number;
  chat_id: number;
  created_at: Date;
  updated_at?: any;
  status?: string;
}

export interface IMessagesObject {
  users_name: string;
  user_id?: number;
  user_position: string;
  user_picture: string;
  chat: Chat;
}

export type MessageListProps = {
  handleGetMessages?: any;
  data?: any;
  usersQueryData?: {} | any;
  usersQueryLoading?: boolean;
};

export type UserInfoProps = {
  data: any;
  // userStatus: { active?: boolean; last_seen?: string };
  // chatInfo: { chat_status: string };
};

export type MessageWindowListProps = {
  messagesLoading?: boolean;
  data?: any;
};

export type ChatBoxNavProps = {
  active: boolean;
  setActive: (val: boolean) => void;
};

export interface IMessageData {
  name: string;
  picture: string;
}

export interface IWindowProps {
  messageList: IMessagesObject;
}

export interface MessageBoxProps {
  item: Message;
  showStatus?: boolean;
  hover: any;
  handleSeeStatus: (iteh: any) => void;
  handleHideStatus: () => void;
  seeStatus: any;
  openCard: boolean;
  hovered: number | any;
  messageList: IMessagesObject;
  setOpenCard: (val: boolean) => void;
  ref?: any;
  userInfo: IUserInfo;
  onMouseEnter: any;
  onMouseLeave: any;
  firstMessage?: any;
}

export interface IUserInfo {
  user_name: string;
  user_picture: string;
  user_id: number | null;
  user_department: string;
  notification: number;
  chat_id: any;
  user_position: string;
}
