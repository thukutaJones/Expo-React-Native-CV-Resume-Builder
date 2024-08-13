import {
  Modal,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default EnterSimpleDetails = ({
  openModel,
  setOpenModel,
  title,
  data,
  targetItem,
  placeholder,
  addButtonText,
  value,
  setValue,
  handleAdd,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={openModel}
      onRequestClose={() => setOpenModel(false)}
    >
      <SafeAreaView className="h-full bg-primary">
        <TouchableOpacity
          className="p-3 h-16 w-16"
          onPress={() => setOpenModel(false)}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={40}
            color={"#31BCED"}
          />
        </TouchableOpacity>
        <Text className="text-blue px-4 text-2xl font-psemibold">{title}</Text>
        <View className="flex-row h-16 items-center mt-4 mb-4 border border-blue">
          <TextInput
            className="w-[72%] h-full px-4 text-xl text-white"
            placeholder={placeholder}
            placeholderTextColor={"gray"}
            autoFocus={true}
            value={value}
            onChangeText={(text) => {
              setValue(text);
            }}
          />
          {value && (
            <TouchableOpacity
              className="h-[60%] items-center justify-center bg-blue w-[23%] rounded-full"
              onPress={() => handleAdd(value)}
            >
              <Text className="text-white text-base">Add</Text>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={data}
          renderItem={(item) => (
            <View className="px-2">
              <View className="border justify-between flex-row px-4 h-16 mt-2 rounded-xl items-center border-gray-600">
                <Text className="text-lg w-[75%] text-white" numberOfLines={1}>
                  {item.item[targetItem]}
                </Text>
                <TouchableOpacity
                  className="h-[60%] items-center justify-center bg-blue w-[23%] rounded-full"
                  onPress={() => {
                    handleAdd(item.item[targetItem]);
                  }}
                >
                  <Text className="text-white text-base">{addButtonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};
