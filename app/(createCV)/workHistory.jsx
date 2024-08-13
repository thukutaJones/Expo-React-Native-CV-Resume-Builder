import { router } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useContext } from "react";
import { CurrentTemplate } from "../../constants/currentTemplate";
import * as SQLite from "expo-sqlite";

import EnterDetails from "../../components/enterDetails";
import WorkData from "../../constants/workData";
import DetailsCard from "../../components/detailsCard";

const workHistory = () => {
  const cvIndex = useContext(CurrentTemplate).cvIndex;

  const [workHistoryDetails, setWorkHistoryDetails] = useState({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [stillWorking, setStillWorking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState();
  const [onScroll, setOnScroll] = useState(false);
  const [workHistoryData, setWorkHistoryData] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    const openDataBase = async () => {
      setIsLoading(true);
      try {
        const db = await SQLite.openDatabaseAsync(`cv${cvIndex}.db`);
        await db.runAsync(
          "CREATE TABLE IF NOT EXISTS workHistory (id INTEGER PRIMARY KEY AUTOINCREMENT, jobtitle TEXT, company TEXT, description TEXT, startDate DATETIME, endDate DATETIME)"
        );
        setDb(db);
        const data = await db.getAllAsync("SELECT * FROM workHistory");
        setWorkHistoryData(data);
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
        workHistoryDetails.companyName &&
        workHistoryDetails.jobTitle &&
        workHistoryDetails.startDate &&
        workHistoryDetails.endDate
      ) {
        const result = await db.runAsync(
          "INSERT INTO workHistory (jobtitle, company, description, startDate, endDate) VALUES (?,?,?,?,?)",
          workHistoryDetails.jobTitle.trim(),
          workHistoryDetails.companyName.trim(),
          workHistoryDetails.description.trim(),
          workHistoryDetails.startDate,
          workHistoryDetails.endDate
        );
        setOpenModal(false);
        router.push("workHistory");
      } else {
        Alert.alert(
          "Insufficient Info",
          "Job Title, Company Name, Start Date and End Date can not be empty"
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
        data={WorkData}
        title={updateMode ? "EDIT WORK HISTORY" : "ADD WORK HISTORY"}
        still={stillWorking}
        setStill={setStillWorking}
        details={workHistoryDetails}
        setMode={setUpdateMode}
        setDetails={setWorkHistoryDetails}
        handleSave={async () => {
          try {
            setIsLoading(true);
            if (updateMode) {
              const result = await db.runAsync(
                "UPDATE workHistory SET jobtitle=?, company=?, description=?, startDate=?, endDate=? WHERE id=?",
                [
                  workHistoryDetails.jobTitle.trim(),
                  workHistoryDetails.companyName.trim(),
                  workHistoryDetails.description.trim(),
                  workHistoryDetails.startDate,
                  workHistoryDetails.endDate,
                  itemId,
                ]
              );
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
        data={workHistoryData}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View className="items-center justify-center h-[80vh]">
            <Text className="text-xl font-psemibold text-white">
              No work experience entered yet
            </Text>
            <Text className="text-lg font-pregular text-gray-500">
              Add a work experience details
            </Text>
          </View>
        )}
        renderItem={(item) => (
          <DetailsCard
            head={item.item.jobtitle}
            subHead={item.item.company}
            handleDelete={() => {
              setIsLoading(true);
              try {
                const result = db.runAsync(
                  "DELETE FROM workHistory WHERE id=?",
                  [item.item.id]
                );
              } catch (error) {
                Alert.alert("Error", error.message);
              } finally {
                router.push("workHistory");
                setIsLoading(false);
              }
            }}
            handleEdit={async () => {
              setUpdateMode(true);
              setOpenModal(true);
              setItemId(item.item.id);
              const result = await db.getAllAsync(
                "SELECT * FROM workHistory WHERE id=?",
                [item.item.id]
              );
              setWorkHistoryDetails({
                ...workHistoryDetails,
                jobTitle: result[0].jobtitle,
                companyName: result[0].company,
                description: result[0].description,
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
      {onScroll ? (
        <TouchableOpacity
          className="bg-blue h-16 w-16 bottom-24 right-2 absolute rounded-xl  flex-row items-center"
          onPress={() => setOpenModal(true)}
        >
          <View className="justify-center items-center h-full ml-4">
            <Text className="text-6xl text-center">+</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="bg-blue h-16 w-56 bottom-24 right-2 absolute rounded-xl  flex-row items-center"
          onPress={() => setOpenModal(true)}
        >
          <View className="justify-center items-center h-full ml-4">
            <Text className="text-4xl">+</Text>
          </View>
          <Text className="ml-3 text-xl font-pmedium">ADD EXPERIENCE</Text>
        </TouchableOpacity>
      )}
      <View className="absolute flex-row justify-between bottom-3 w-full">
        <TouchableOpacity
          className="w-[30%] border h-12 border-blue ml-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("personalDetails")}
        >
          <Text className="text-blue text-xl font-pbold">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[30%] h-12 bg-blue mr-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("education")}
        >
          <Text className="text-white text-xl font-pregular">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default workHistory;
