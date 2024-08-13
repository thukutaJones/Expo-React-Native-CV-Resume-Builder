import { router } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useContext } from "react";
import { CurrentTemplate } from "../../constants/currentTemplate";
import * as SQLite from "expo-sqlite";

import EnterDetails from "../../components/enterDetails";
import referencesData from "../../constants/referencesData";
import DetailsCard from "../../components/detailsCard";

const References = () => {
  const cvIndex = useContext(CurrentTemplate).cvIndex;

  const [referencesDetails, setReferencesDetails] = useState({
    refName: "",
    jobTitle: "",
    companyName: "",
    address: "",
    email: "",
    phone: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState();
  const [onScroll, setOnScroll] = useState(false);
  const [refrences, setReferences] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [fieldsFocused, setFieldsFocused] = useState(false);

  useEffect(() => {
    const openDataBase = async () => {
      setIsLoading(true);
      try {
        const db = await SQLite.openDatabaseAsync(`cv${cvIndex}.db`);
        await db.runAsync(
          "CREATE TABLE IF NOT EXISTS references_ (id INTEGER PRIMARY KEY AUTOINCREMENT, refName TEXT, jobTitle TEXT, companyName TEXT, address_ TEXT, phone TEXT, email TEXT)"
        );
        setDb(db);
        const data = await db.getAllAsync("SELECT * FROM references_");
        setReferences(data);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    openDataBase();
  }, []);

  const saveToDatabse = async () => {
    setIsLoading(false);
    try {
      if (
        referencesDetails.refName &&
        referencesDetails.jobTitle &&
        referencesDetails.phone &&
        referencesDetails.email
      ) {
        const result = await db.runAsync(
          "INSERT INTO references_ (refName, jobTitle, companyName, address_, phone, email) VALUES (?,?,?,?,?,?)",
          referencesDetails.refName.trim(),
          referencesDetails.jobTitle.trim(),
          referencesDetails.companyName.trim(),
          referencesDetails.address.trim(),
          referencesDetails.phone.trim(),
          referencesDetails.email.trim()
        );
        setOpenModal(false);
        router.push("references");
      } else {
        Alert.alert(
          "Insufficient Info",
          "Reference Name, Job Title, Phone and Email can not be empty"
        );
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
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
      <EnterDetails
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={referencesData}
        title={updateMode ? "EDIT REFERENCE" : "ADD REFERENCE"}
        details={referencesDetails}
        setMode={setUpdateMode}
        setDetails={setReferencesDetails}
        handleSave={async () => {
          try {
            setIsLoading(true);
            if (updateMode) {
              const result = await db.runAsync(
                "UPDATE references_ SET refName=?, jobTitle=?, companyName=?, address_=?, email=?, phone=? WHERE id=?",
                [
                  referencesDetails.refName.trim(),
                  referencesDetails.jobTitle.trim(),
                  referencesDetails.companyName.trim(),
                  referencesDetails.address.trim(),
                  referencesDetails.email.trim(),
                  referencesDetails.phone.trim(),
                  itemId,
                ]
              );
              router.push("references");
            } else {
              saveToDatabse();
            }
          } catch (error) {
            Alert.alert("Error", error.message);
          } finally {
            setIsLoading(false);
          }
        }}
      />
      <FlatList
        data={refrences}
        ListEmptyComponent={() => (
          <View className="items-center justify-center h-[80vh]">
            <Text className="text-xl font-psemibold text-white">
              No Reference entered yet
            </Text>
            <Text className="text-lg font-pregular text-gray-500">
              Add a reference
            </Text>
          </View>
        )}
        renderItem={(item) => (
          <DetailsCard
            head={item.item.refName}
            subHead={item.item.jobTitle}
            handleDelete={() => {
              setIsLoading(true);
              try {
                const result = db.runAsync(
                  "DELETE FROM references_ WHERE id=?",
                  [item.item.id]
                );
              } catch (error) {
                Alert.alert("Error", error.message);
              } finally {
                router.push("references");
                setIsLoading(false);
              }
            }}
            handleEdit={async () => {
              setUpdateMode(true);
              setOpenModal(true);
              setItemId(item.item.id);
              const result = await db.getAllAsync(
                "SELECT * FROM references_ WHERE id=?",
                [item.item.id]
              );
              setReferencesDetails({
                ...referencesDetails,
                refName: result[0].refName,
                jobTitle: result[0].jobTitle,
                companyName: result[0].companyName,
                address: result[0].address_,
                email: result[0].email,
                phone: result[0].phone,
              });
            }}
          />
        )}
        onScrollEndDrag={() => setOnScroll(true)}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      />
      <TouchableOpacity
        className="bg-blue h-16 w-56 bottom-24 right-2 absolute rounded-xl  flex-row items-center"
        onPress={() => setOpenModal(true)}
      >
        <View className="justify-center items-center h-full ml-4">
          <Text className="text-4xl">+</Text>
        </View>
        <Text className="ml-3 text-xl font-pmedium">ADD REFERENCE</Text>
      </TouchableOpacity>
      <View className="absolute flex-row justify-between bottom-3 w-full">
        <TouchableOpacity
          className="w-[30%] border h-12 border-blue ml-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("objectives")}
        >
          <Text className="text-blue text-xl font-pbold">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[30%] h-12 bg-blue mr-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("languages")}
        >
          <Text className="text-white text-xl font-pregular">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default References;
