import { router } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

import images from "../constants/images";

const EmptyState = ({ handlePress }) => {
  require("../app/(createCV)/templates");
  return (
    <View className="justify-center items-center h-[80vh]">
      <View className="items-center justify-center">
        <Image
          source={images.empty}
          resizeMode="contain"
          className="w-[250px] h-[180px]"
        />
        <Text className="text-2xl font-pmedium text-gray-100">
          No CV's created yet
        </Text>
        <Text className="text-lg text-center font-psemibold text-gray-500 mt-2">
          Start by creating your first CV
        </Text>
      </View>
      <TouchableOpacity
        className="bg-blue h-14 w-[85%] rounded-2xl mt-5 items-center justify-center"
        onPress={handlePress}
      >
        <Text className="text-white text-2xl">Create a CV</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
