import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Templates from "../(createCV)/templates";

const Downloads = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <Text className="text-3xl text-blue mt-4">Templates</Text>
      <Templates />
    </SafeAreaView>
  );
};

export default Downloads;
