export interface IUsers {
  activeUserIds?: number[] | any;
  groupChats: any;
  usersAndChats: any;
  id: number;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  picture: string;
  created_at?: string;
  updated_at?: string;
  status: string;
}

export interface IGroupChat {
  chat_id: number;
  chat_name: string;
  chat_type: string | any;
  user_picture: string;
  chat_created_at?: any;
  latest_message: string;
  user_department: string;
  notification: number;
}

export interface IUsersAndChat {
  id: number;
  user_name: string;
  lt_msg_file: string;
  user_department: string;
  user_position: string;
  user_picture: string;
  notification: number;

  chat_id?: number;
  chat_type: string | any;
  chat_created_at?: any;
  latest_message: string;
}

export interface RootObject {
  groupChats: IGroupChat[];
  usersAndChats: IUsersAndChat[];
}

export interface IMessages {
  id?: number;
  content: any;
  file?: any;
  sender_id?: any;
  chat_id?: number;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
}
export enum ChatEvent {
  GetChatAllMessage = "get-chat-all-messages",
  TYPING = "typing",
  CONNECTED = "connected",
  StopTyping = "stop-typing",
  CONNECTION = "connection",
  SendPrivateFile = "send-private-file",
  SendPrivateMessage = "send-private-message",
  ReceivePrivateMessage = "receive-private-message",
  SendNotification = "send-notification",
  AnswerChatRequest = "answer-chat-request",
}
