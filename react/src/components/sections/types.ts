export type CardProps = {
  name: string;
  activeUser?: boolean;
  time: string;
  user_id?: number;
  message?: string;
  id: number | any;
  userInfo?: any;
  opened?: boolean;
  position?: string;
  collapsed: boolean;
  user_picture?: any;
  current_chat_id: any;
  user_position?: any;
  chat_id: any;
  lt_msg_file?: string;
  user_department?: string;
  notification: number;
  chat_type?: string | any;
  img?: string | undefined;
  setOpened: (val: boolean) => void;
  onClick?: (
    val: number,
    type: string,
    name: string,
    pticture: any,
    position: any,
    department: any,
    notification: number,
    chat_id: any
  ) => void | undefined;
};

export type MessageStatusProps = {
  left?: boolean;
  firstMessage?: boolean;
  status?: string;
};
export type MuteUnmuteProps = {
  setOpen: any;
  setMute: any;
};
