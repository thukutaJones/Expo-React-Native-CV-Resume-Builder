import { Text, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SeetingsButton = ({ iconName, text, handlePress }) => {
  return (
    <TouchableOpacity
      className="flex-row w-full h-16 items-center mt-2 border-t border-b border-t-blue border-b-blue"
      onPress={handlePress}
    >
      <MaterialCommunityIcons name={iconName} size={35} color="#31BCED" />
      <Text
        className="text-xl px-4 w-[85%] text-blue"
        style={{ fontWeight: 600 }}
      >
        {text}
      </Text>
      <MaterialCommunityIcons name="chevron-right" size={25} color="#31BCED" />
    </TouchableOpacity>
  );
};

export default SeetingsButton;
