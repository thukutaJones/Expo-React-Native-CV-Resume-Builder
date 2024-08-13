import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openURL } from "expo-linking";
import images from "../../constants/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SeetingsButton from "../../components/settingsButtons";

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary h-full relative">
      <Image
        source={images.bg}
        className="w-full h-[35%] border border-white rounded-b-xl"
      />
      <View className="mt-6 px-4">
        <SeetingsButton
          iconName="message-alert"
          text="Feedback"
          handlePress={() => {
            openURL("mailto:jonesthukuta@gmail.com");
          }}
        />
        <SeetingsButton
          iconName="information"
          text="About"
          handlePress={() => {
            Alert.alert(
              "About",
              "Name: Moth CV Builder\nVersion: 0.0.1\nDeveloper: Jones Thukuta"
            );
          }}
        />
      </View>
      <View className="absolute bottom-5 h-24 w-full">
        <Text className="text-center text-blue text-sm h-[25%]">
          Contact Us
        </Text>
        <View className="flex-row w-full h-[75%] items-center px-20 justify-between -mt-4">
          <TouchableOpacity
            onPress={() => {
              openURL("sms:+265888941871");
            }}
          >
            <MaterialCommunityIcons
              name="whatsapp"
              size={40}
              color={"#31BCED"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openURL("mailto:jonesthukuta@gmail.com");
            }}
          >
            <MaterialCommunityIcons name="email" size={40} color={"#31BCED"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openURL("fb://profile/jones.thukutajr");
            }}
          >
            <MaterialCommunityIcons
              name="facebook"
              size={40}
              color={"#31BCED"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openURL("instagram://user?username=thukutaJones");
            }}
          >
            <MaterialCommunityIcons
              name="instagram"
              size={40}
              color={"#31BCED"}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-blue text-center">© jonesthukuta2024</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
