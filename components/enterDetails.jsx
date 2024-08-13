import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import DatePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FormFields from "./formFiels";

const EnterDetails = ({
  openModal,
  setOpenModal,
  data,
  title,
  still,
  setStill,
  details,
  setDetails,
  handleSave,
  setMode,
  setDescription,
}) => {
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [itemid, setItemId] = useState();

  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {
        setDetails({
          ...details,
          jobTitle: "",
          companyName: "",
          description: "",
          startDate: "",
          endDate: "",
        });
        setDetails({
          ...details,
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
        });
        try {
          setStill(false);
        } catch (error) {}
        setMode(false);
        setOpenModal(false);
      }}
      visible={openModal}
    >
      <SafeAreaView className="h-full relative bg-primary">
        {openDate && (
          <DatePicker
            display="spinner"
            maximumDate={new Date()}
            mode="date"
            value={date}
            onChange={({ type }, selectedDate) => {
              if (type === "set") {
                setDate(selectedDate);
                setDetails({ ...details, [itemid]: selectedDate.getTime() });
                setOpenDate(false);
              } else {
                setOpenDate(false);
              }
            }}
          />
        )}
        <TouchableOpacity
          className="mt-4 h-12 justify-center w-12 ml-4"
          onPress={() => {
            setDetails({
              ...details,
              jobTitle: "",
              companyName: "",
              description: "",
              startDate: "",
              endDate: "",
            });
            setDetails({
              ...details,
              school: "",
              degree: "",
              startDate: "",
              endDate: "",
            });
            try {
              setStill(false);
            } catch (error) {}
            setMode(false);
            setOpenModal(false);
          }}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={40}
            color={"#31BCED"}
          />
        </TouchableOpacity>
        <ScrollView>
          <>
            <Text className="text-blue mt-4 text-2xl font-psemibold ml-4">
              {title}
            </Text>
            {data.map((item) => (
              <FormFields
                key={item.id}
                placeholder={item.placeHolder}
                iconName={item.iconName}
                details={details}
                setDetails={setDetails}
                handleFocus={() => {
                  setItemId(item.id), setOpenDate(true);
                }}
                itemId={item.id}
                multline={item.multline}
                still={still}
                setStill={setStill}
                value={
                  (item.id === "startDate" || item.id === "endDate") &&
                  details[item.id] &&
                  details[item.id] !== "Nowadays"
                    ? new Date(details[item.id]).toDateString()
                    : details[item.id]
                }
                handleInput={(text) => {
                  setDetails({ ...details, [item.id]: text });
                }}
              />
            ))}
            <View className="h-36 w-full" />
          </>
        </ScrollView>
        <View className="px-2 items-center">
          <TouchableOpacity
            className="absolute bottom-2 w-full items-center justify-center bg-blue h-12 rounded-3xl"
            onPress={handleSave}
          >
            <Text className="text-xl text-white">Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default EnterDetails;
