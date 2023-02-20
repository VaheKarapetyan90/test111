import { Div, Text } from "../general";

const PopoverContent = () => {
  return (
    <div>
      <Div rounded="4px 4px 0 0" cursor="pointer" hover padding=" 10px">
        <Text
          align="left"
          fSize="16px"
          fWeight="400"
          lineHeight="20px"
          color="#000"
        >
          Chat request
        </Text>
      </Div>
      <Div cursor="pointer" hover padding=" 10px">
        <Text
          align="left"
          fSize="16px"
          fWeight="400"
          lineHeight="20px"
          color="#000"
        >
          Decined Chat request
        </Text>
      </Div>
      <Div rounded="0 0 4px 4px" cursor="pointer" hover padding="10px">
        <Text
          align="left"
          fSize="16px"
          fWeight="400"
          lineHeight="20px"
          color="#000"
        >
          Archive chats
        </Text>
      </Div>
    </div>
  );
};

export default PopoverContent;
