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
import * as SQLite from "expo-sqlite";
import { CurrentTemplate } from "../../constants/currentTemplate";

import EnterDetails from "../../components/enterDetails";
import educationData from "../../constants/educationData";
import DetailsCard from "../../components/detailsCard";

const Education = () => {
  const cvIndex = useContext(CurrentTemplate).cvIndex;
  const [educationDetails, setEducationDetails] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [stillSchooling, setStillSchooling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState();
  const [educationHistotyData, setEducationHistoryData] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    const openDataBase = async () => {
      setIsLoading(true);
      try {
        const db = await SQLite.openDatabaseAsync(`cv${cvIndex}.db`);
        await db.runAsync(
          "CREATE TABLE IF NOT EXISTS education (id INTEGER PRIMARY KEY AUTOINCREMENT, school TEXT, degree TEXT, startDate DATETIME, endDate DATETIME)"
        );
        setDb(db);
        const data = await db.getAllAsync("SELECT * FROM education");
        setEducationHistoryData(data);
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
        educationDetails.school &&
        educationDetails.degree &&
        educationDetails.startDate &&
        educationDetails.endDate
      ) {
        const result = await db.runAsync(
          "INSERT INTO education (school, degree, startDate, endDate) VALUES (?,?,?,?)",
          educationDetails.school.trim(),
          educationDetails.degree.trim(),
          educationDetails.startDate,
          educationDetails.endDate
        );
        setOpenModal(false);
        router.push("education");
      } else {
        Alert.alert(
          "Insufficient Info",
          "School, Degree / Certificate, Start Date and End Date can not be empty"
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
        data={educationData}
        title={updateMode ? "EDIT EDUCATION" : "ADD EDUCATION"}
        still={stillSchooling}
        setStill={setStillSchooling}
        details={educationDetails}
        setMode={setUpdateMode}
        setDetails={setEducationDetails}
        handleSave={async () => {
          try {
            setIsLoading(true);
            if (updateMode) {
              const result = await db.runAsync(
                "UPDATE education SET school=?, degree=?, startDate=?, endDate=? WHERE id=?",
                [
                  educationDetails.school.trim(),
                  educationDetails.degree.trim(),
                  educationDetails.startDate,
                  educationDetails.endDate,
                  itemId,
                ]
              );
            } else {
              setEducationDetails({
                ...educationDetails,
                endDate: !stillSchooling && "Nowadays",
              });
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
        data={educationHistotyData}
        ListEmptyComponent={() => (
          <View className="items-center justify-center h-[80vh]">
            <Text className="text-xl font-psemibold text-white">
              No Education history entered yet
            </Text>
            <Text className="text-lg font-pregular text-gray-500">
              Add an education background
            </Text>
          </View>
        )}
        renderItem={(item) => (
          <DetailsCard
            head={item.item.school}
            subHead={item.item.degree}
            handleDelete={() => {
              setIsLoading(true);
              try {
                const result = db.runAsync("DELETE FROM education WHERE id=?", [
                  item.item.id,
                ]);
              } catch (error) {
                Alert.alert("Error", error.message);
              } finally {
                router.push("education");
                setIsLoading(false);
              }
            }}
            handleEdit={async () => {
              setUpdateMode(true);
              setOpenModal(true);
              setItemId(item.item.id);
              const result = await db.getAllAsync(
                "SELECT * FROM education WHERE id=?",
                [item.item.id]
              );
              setEducationDetails({
                ...educationDetails,
                school: result[0].school,
                degree: result[0].degree,
                startDate:
                  typeof result[0].startDate === "string"
                    ? result[0].startDate
                    : new Date(result[0].startDate),
                endDate:
                  typeof result[0].endDate === "string"
                    ? result[0].endDate
                    : new Date(result[0].endDate),
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
        <Text className="ml-3 text-xl font-pmedium">ADD EDUCATION</Text>
      </TouchableOpacity>
      <View className="absolute flex-row justify-between bottom-3 w-full">
        <TouchableOpacity
          className="w-[30%] border h-12 border-blue ml-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("workHistory")}
        >
          <Text className="text-blue text-xl font-pbold">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[30%] h-12 bg-blue mr-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("skills")}
        >
          <Text className="text-white text-xl font-pregular">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Education;
