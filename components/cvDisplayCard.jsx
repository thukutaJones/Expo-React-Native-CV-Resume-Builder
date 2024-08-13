import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import images from "../constants/images";

const CVDisplayCard = ({ handleEdit, handleShare, handleDelete, cvName }) => {
  const DisplayIcon = ({ name, handlePress }) => {
    return (
      <TouchableOpacity
        className="h-8 items-center justify-center w-[45%] bg-primary rounded-full"
        onPress={handlePress}
      >
        <MaterialCommunityIcons name={name} size={20} color={"#31BCED"} />
      </TouchableOpacity>
    );
  };
  return (
    <TouchableOpacity
      className="w-[47%] h-64 bg-gray-700 relative mr-[3%] mt-[3%] rounded-xl"
      onPress={handleEdit}
    >
      <ImageBackground
        source={images.add_profile}
        className="h-full w-full"
        resizeMode="contain"
      >
        <Text
          className="text-center text-black font-psemibold text-sm mt-4"
          numberOfLines={1}
        >
          {`CV ${Number(cvName.slice(2, -3)) + 1}`}
        </Text>
        <View className="absolute w-full bottom-2 h-10 flex-row justify-between items-center px-2">
          <DisplayIcon name="share-variant" handlePress={handleShare} />
          <DisplayIcon name="delete" handlePress={handleDelete} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CVDisplayCard;
