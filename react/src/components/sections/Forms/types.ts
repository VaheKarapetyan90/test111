export type FormProps = {
  signIn?: boolean;
  onFinishFailed?: () => void;
  onFinish?: (data: any) => void;
  formItems: any[];
  window?: boolean;
  emojiOpen?: boolean;
  setEmojiOpen?: any;
  form?: {};
  text?: string;
  handleKeyPress?: any;
};
