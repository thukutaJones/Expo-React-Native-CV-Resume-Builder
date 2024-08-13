import { View, TouchableOpacity, TextInput, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CheckBox from "expo-checkbox";

const FormField = ({
  placeholder,
  handleInput,
  iconName,
  handleFocus,
  itemId,
  value,
  multline,
  disabled,
  still,
  setStill,
  details,
  setDetails,
}) => {
  return (
    <>
      <View className="mt-4 h-[60px] flex-row items-center">
        <View className="h-[60px] w-[18%] items-center justify-center">
          <MaterialCommunityIcons name={iconName} size={32} color={"#31BCED"} />
        </View>
        {itemId === "dateOfBirth" ||
        itemId === "startDate" ||
        itemId === "endDate" ||
        itemId === "gender" ? (
          <TouchableOpacity
            onPress={handleFocus}
            className="w-[75%] h-[60px] justify-center border rounded-sm border-blue"
            disabled={disabled || (itemId === "endDate" && still)}
          >
            <TextInput
              className={`text-lg h-full text-black ${
                !(still && itemId === "endDate") && "px-4"
              } text-white`}
              placeholder={placeholder}
              editable={false}
              placeholderTextColor={"gray"}
              value={value}
              style={{
                backgroundColor:
                  itemId === "endDate" && still ? "gray" : "transparent",
              }}
            />
          </TouchableOpacity>
        ) : itemId === "description" ? (
          <TextInput
            className="border text-lg justify-start px-2 py-2 h-24 rounded-sm w-[75%] mt-8 text-white border-blue"
            multiline={true}
            placeholder={placeholder}
            textAlignVertical="top"
            placeholderTextColor={"gray"}
            scrollEnabled={true}
            value={value}
            onFocus={() => {
              !value ? setDetails({ ...details, description: `\u2022` }) : "";
            }}
            numberOfLines={4}
            onChangeText={(text) => {
              setDetails({
                ...details,
                description: text
                  .split("\n")
                  .map(
                    (line) =>
                      `${
                        line
                          ? line.charAt(0) !== "\u2022"
                            ? `\u2022 ${line}`
                            : `${line}`
                          : ""
                      }`
                  )
                  .join("\n"),
              }); //line.charAt(0) !== '\u2022' ? `\u2022 ${line}` : `${line}`
            }}
          />
        ) : (
          <TextInput
            className="w-[75%] h-[60px] text-lg px-4 border rounded-sm text-white border-blue"
            placeholderTextColor={"gray"}
            placeholder={placeholder}
            maxLength={itemId === "linkedIn" ? 40 : null}
            onChangeText={handleInput}
            multiline={multline}
            keyboardType={
              itemId === "phone" || itemId === "phoneNumber"
                ? "phone-pad"
                : itemId === "email"
                ? "email-address"
                : "default"
            }
            value={value}
          />
        )}
      </View>
      {itemId === "endDate" && (
        <View className="flex-row mt-3 ml-20">
          <CheckBox
            className="h-6 w-6 mr-3"
            value={still}
            onValueChange={(toggleValue) => {
              if (toggleValue) {
                setDetails({ ...details, endDate: "Nowadays" });
              } else {
                setDetails({ ...details, endDate: "" });
              }
              setStill(toggleValue);
            }}
          />
          <Text className="text-[14px] text-white">
            I am currently still on this role
          </Text>
        </View>
      )}
    </>
  );
};

export default FormField;
