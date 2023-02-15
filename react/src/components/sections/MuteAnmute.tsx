import { FC } from "react";
import { CardWrapper, Div, Text } from "../general";
import { MuteUnmuteProps } from "./types";

const MuteUnmute: FC<MuteUnmuteProps> = ({ setMute, setOpen }) => {
  return (
    <>
      <Div
        cursor="pointer"
        hover
        margin="10px  0 0 0 "
        padding="10px"
        onClick={() => {
          setMute(false);
          setOpen(false);
        }}
      >
        <Text
          align="left"
          fSize="16px"
          fWeight="400"
          lineHeight="20px"
          color="#000"
        >
          Unmute
        </Text>
      </Div>
      <Div
        cursor="pointer"
        hover
        padding="10px"
        onClick={() => {
          setMute(true);
          setOpen(false);
        }}
      >
        <Text
          align="left"
          fSize="16px"
          fWeight="400"
          lineHeight="20px"
          color="#000"
        >
          1 Hours
        </Text>
      </Div>
      <Div
        cursor="pointer"
        hover
        padding=" 10px"
        onClick={() => {
          setMute(true);
          setOpen(false);
        }}
      >
        <Text
          align="left"
          fSize="16px"
          fWeight="400"
          lineHeight="20px"
          color="#000"
        >
          8 Hours
        </Text>
      </Div>
      <Div
        cursor="pointer"
        hover
        padding="10px"
        onClick={() => {
          setMute(true);
          setOpen(false);
        }}
      >
        <Text
          align="left"
          fSize="16px"
          fWeight="400"
          lineHeight="20px"
          color="#000"
        >
          1 Day
        </Text>
      </Div>
      <Div
        cursor="pointer"
        hover
        padding=" 10px"
        onClick={() => {
          setMute(true);
          setOpen(false);
        }}
      >
        <Text
          align="left"
          fSize="16px"
          fWeight="400"
          lineHeight="20px"
          color="#000"
        >
          Forever
        </Text>
      </Div>
      <Div bgc="#F2F2F2" margin="0 0 5px 0">
        <Text fSize="16px" fWeight="400" lineHeight="20px" color="#000">
          On Mute : 59 mins left
        </Text>
      </Div>
    </>
  );
};
export default MuteUnmute;
