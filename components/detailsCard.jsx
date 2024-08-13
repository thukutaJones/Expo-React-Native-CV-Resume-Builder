import { TouchableOpacity, Text, View } from "react-native";

export default DetailsCard = ({ head, subHead, handleDelete, handleEdit }) => {
  return (
    <View className="w-full h-24 items-center justify-center mt-4">
      <View className="border w-[90%] h-full flex-row rounded-md border-gray-600">
        <View className="h-full w-[55%] justify-center px-2">
          <Text
            className="text-2xl font-psemibold text-white"
            numberOfLines={1}
          >
            {head}
          </Text>
          <Text className="text-base font-regular text-white" numberOfLines={1}>
            {subHead}
          </Text>
        </View>
        <View className="flex-row w-[45%] h-full items-center justify-between px-2">
          <TouchableOpacity
            className="bg-blue h-[35%] w-[48%] rounded-3xl items-center justify-center"
            onPress={handleEdit}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border h-[35%] w-[48%] rounded-3xl items-center justify-center border-blue"
            onPress={handleDelete}
          >
            <Text className="text-blue">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
