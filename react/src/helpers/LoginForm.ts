import { getRequiredRule, getEmailRule } from "./validation";

export const LoginForm = [
  {
    id: 1,
    name: "email",
    label: "Email",
    rules: [getRequiredRule("This field is required!"), getEmailRule()],
  },
  {
    id: 12,
    name: "password",
    label: "Password",
    rules: [getRequiredRule()],
  },
];
