import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/formFiels";
import pernalDetailsData from "../../constants/pernalDetailsData";
import DatePicker from "@react-native-community/datetimepicker";
import { useState, useEffect, useContext } from "react";
import { CurrentTemplate } from "../../constants/currentTemplate";
import { router } from "expo-router";
import { FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";
import Checkbox from "expo-checkbox";

export default PersonalDetails = () => {
  const cvIndex = useContext(CurrentTemplate).cvIndex;

  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    profession: "",
    gender: "",
    nationality: "",
    dateOfBirth: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    maritalStatus: "",
    religion: "",
    githubAccount: "",
    website: "",
    linkedIn: "",
    portfolio: "",
  });

  const [openDate, setOpenDate] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const [genderField, setGenderField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const openDataBase = async () => {
      setIsLoading(true);
      try {
        const db = await SQLite.openDatabaseAsync(`cv${cvIndex}.db`);
        await db.runAsync(
          "CREATE TABLE IF NOT EXISTS personalDetails (id INTEGER PRIMARY KEY AUTOINCREMENT, fullName TEXT, profession TEXT, gender TEXT, nationality TEXT, dateOfBirth DATETIME, phone TEXT, email TEXT, profilePhoto TEXT, address_ TEXT, maritalStatus TEXT, religion TEXT, githubAccount TEXT, website TEXT, linkedIn TEXT, portfolio TEXT)"
        );
        setDb(db);
        const data = await db.getAllAsync("SELECT * FROM personalDetails");
        if (data.length) {
          setPersonalDetails({
            ...personalDetails,
            fullName: data[0].fullName,
            profession: data[0].profession,
            gender: data[0].gender,
            nationality: data[0].nationality,
            dateOfBirth: data[0].dateOfBirth
              ? new Date(data[0].dateOfBirth).toDateString()
              : data[0].dateOfBirth,
            phoneNumber: data[0].phone,
            emailAddress: data[0].email,
            address: data[0].address_,
            maritalStatus: data[0].maritalStatus,
            religion: data[0].religion,
            githubAccount: data[0].githubAccount,
            website: data[0].website,
            linkedIn: data[0].linkedIn,
            portfolio: data[0].portfolio,
          });
          setProfilePhoto(data[0].profilePhoto);
        } else {
          await db.runAsync(
            "INSERT INTO personalDetails (fullName, profession, gender, nationality, dateOfBirth, phone, email, profilePhoto, address_, maritalStatus, religion, githubAccount, linkedIn, website, portfolio) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          );
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    openDataBase();
  }, []);

  const saveToDatabase = async () => {
    setIsLoading(true);
    const statement = await db.prepareAsync(
      "UPDATE personalDetails SET fullName=$fullName, profession=$profession, gender=$gender, nationality=$nationality, dateOfBirth=$dateOfBirth, phone=$phone, email=$email, address_=$address_, maritalStatus=$maritalStatus, religion=$religion, githubAccount=$githubAccount, linkedIn=$linkedIn, website=$website, portfolio=$portfolio"
    );
    try {
      await statement.executeAsync({
        $fullName: personalDetails.fullName.trim(),
        $profession: personalDetails.profession.trim(),
        $gender: personalDetails.gender.trim(),
        $nationality: personalDetails.nationality.trim(),
        $dateOfBirth: personalDetails.dateOfBirth,
        $phone: personalDetails.phoneNumber.trim(),
        $email: personalDetails.emailAddress.trim(),
        $address_: personalDetails.address.trim(),
        $maritalStatus: personalDetails.maritalStatus.trim(),
        $religion: personalDetails.religion.trim(),
        $githubAccount: personalDetails.githubAccount.trim(),
        $linkedIn: personalDetails.linkedIn.trim(),
        $website: personalDetails.website.trim(),
        $portfolio: personalDetails.portfolio.trim(),
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      await statement.finalizeAsync();
      setIsLoading(false);
      router.push("workHistory");
    }
  };

  const uploadImage = async (mode) => {
    try {
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.canceled) {
          await saveImage(result.assets[0].uri);
        }
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.canceled) {
          await saveImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      alert(`Error uploading Image: \n ${error.message}`);
    }
  };

  const saveImage = async (image) => {
    try {
      const result = await db.runAsync(
        "UPDATE personalDetails SET profilePhoto=? WHERE id=?",
        [image, 1]
      );
      setProfilePhoto(image);
      setDisplayModal(false);
    } catch (error) {
      throw error;
    }
  };

  const removeImage = async () => {
    try {
      await saveImage(null);
    } catch ({ message }) {
      Alert.alert("Error", message);
      setDisplayModal(false);
    }
  };

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-primary">
        <ActivityIndicator size="large" color="#31BCED" />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full relative">
      {openDate && (
        <DatePicker
          display="spinner"
          maximumDate={new Date()}
          mode="date"
          value={date}
          onChange={({ type }, selectedDate) => {
            if (type === "set") {
              setDate(selectedDate);
              setPersonalDetails({
                ...personalDetails,
                dateOfBirth: selectedDate.getTime(),
              });
              setOpenDate(false);
            } else {
              setOpenDate(false);
            }
          }}
        />
      )}
      <ScrollView>
        <>
          <View className="items-center">
            <View className="items-center h-52 w-52">
              <TouchableOpacity
                className="w-[70%] h-[70%] items-center justify-center rounded-full border border-blue"
                onPress={() => setDisplayModal(true)}
              >
                <Image
                  source={
                    profilePhoto ? { uri: profilePhoto } : images.add_profile
                  }
                  className={
                    profilePhoto
                      ? "w-[100%] h-[100%] rounded-full"
                      : "w-[100%] h-[100%] rounded-full"
                  }
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text className="text-center text-base font-pmedium text-blue">
                Add Profile Picture
              </Text>
            </View>
          </View>
          {pernalDetailsData.map((item) => (
            <FormField
              key={item.id}
              placeholder={item.placeHolder}
              iconName={item.iconName}
              itemId={item.id}
              handleFocus={() =>
                item.id === "gender" ? setGenderField(true) : setOpenDate(true)
              }
              value={
                item.id === "dateOfBirth" && personalDetails[item.id]
                  ? new Date(personalDetails[item.id]).toDateString()
                  : personalDetails[item.id]
              }
              disabled={openDate || genderField}
              multline={item.multline}
              handleInput={(text) => {
                setPersonalDetails({ ...personalDetails, [item.id]: text });
              }}
            />
          ))}
        </>
      </ScrollView>
      <TouchableOpacity
        className="h-12 left-[65%] w-[30%] bottom-2 rounded-3xl items-center justify-center bg-blue"
        onPress={() => saveToDatabase()}
      >
        <Text className="text-center text-white text-xl">Next</Text>
      </TouchableOpacity>
      {displayModal && (
        <Modal
          animationType="fade"
          onRequestClose={() => setDisplayModal(false)}
          visible={displayModal}
          transparent
        >
          <TouchableOpacity
            className="flex-1 items-center justify-end"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onPress={() => setDisplayModal(false)}
          >
            <View className="w-full bg-white h-[20%] rounded-t-3xl flex-row justify-between items-center px-14">
              <TouchableOpacity
                className="items-center justify-center"
                onPress={() => uploadImage("cemera")}
              >
                <FontAwesome5 name="camera-retro" size={40} color="#31BCED" />
                <Text className="text-lg font-psemibold">Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center justify-center"
                onPress={() => uploadImage("gallery")}
              >
                <FontAwesome name="picture-o" size={40} color="#31BCED" />
                <Text className="text-lg font-psemibold">Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center justify-center"
                onPress={removeImage}
              >
                <AntDesign name="delete" size={40} color="#31BCED" />
                <Text className="text-lg font-psemibold">Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
      {genderField && (
        <Modal
          animationType="fade"
          onRequestClose={() => setDisplayModal(false)}
          visible={genderField}
          transparent
        >
          <TouchableOpacity
            className="flex-1 items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onPress={() => setGenderField(false)}
          >
            <View className="w-[90%] bg-white h-[23%] rounded-3xl px-6">
              <Text className="mt-4 text-3xl font-psemibold text-blue">
                Gender
              </Text>
              <View className="flex-row items-center mt-4 justify-between">
                <Text className="text-2xl font-pmedium mr-16">Male</Text>
                <Checkbox
                  className="rounded-full h-8 w-8"
                  value={personalDetails.gender === "Male"}
                  color={personalDetails.gender === "Male" && "#31BCED"}
                  onValueChange={() =>
                    setPersonalDetails({ ...personalDetails, gender: "Male" })
                  }
                />
              </View>
              <View className="flex-row items-center mt-4 justify-between">
                <Text className="text-2xl font-pmedium mr-16">Female</Text>
                <Checkbox
                  className="rounded-full h-8 w-8"
                  value={personalDetails.gender === "Female"}
                  color={personalDetails.gender === "Female" && "#31BCED"}
                  onValueChange={() =>
                    setPersonalDetails({ ...personalDetails, gender: "Female" })
                  }
                />
              </View>
              <TouchableOpacity
                className="items-center justify-center bg-blue h-10 w-32 ml-[64%] mt-2 rounded-3xl"
                onPress={() => setGenderField(false)}
              >
                <Text className="text-white text-lg font-pmedium">Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </SafeAreaView>
  );
};
