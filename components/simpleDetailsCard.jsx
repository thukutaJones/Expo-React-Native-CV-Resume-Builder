import { TouchableOpacity, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default SimpleDetailsCard = ({ title, handleDelete }) => {
  return (
    <View className="w-full h-20 items-center mt-4">
      <View className="border w-[90%] h-full flex-row rounded-md border-gray-700 justify-between items-center">
        <View className="h-full w-[55%] justify-center px-2">
          <Text className="text-xl font-psemibold text-white" numberOfLines={1}>
            {title}
          </Text>
        </View>
        <TouchableOpacity className="p-3 h-16 w-16" onPress={handleDelete}>
          <MaterialCommunityIcons
            name="close-circle"
            size={40}
            color={"#31BCED"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
