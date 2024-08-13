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
import { printAsync } from "expo-print";
import Templates from "../../constants/templates";

import EnterSimpleDetails from "../../components/enterSimpleDetails";
import SimpleDetailsCard from "../../components/simpleDetailsCard";
import { CurrentTemplate } from "../../constants/currentTemplate";

const achievements = () => {
  const [openModal, setOpenModal] = useState(false);
  const [achievement, setAchievment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState();
  const [achievementsData, setAchievementsData] = useState([{}]);
  const [currentTemplate, setCurrentTemplate] = useState("template_1");

  const cvContext = useContext(CurrentTemplate);
  useEffect(() => {
    const openDataBase = async () => {
      setIsLoading(true);
      try {
        const db = await SQLite.openDatabaseAsync(`cv${cvContext.cvIndex}.db`);
        await db.runAsync(
          "CREATE TABLE IF NOT EXISTS achievements (id INTEGER PRIMARY KEY AUTOINCREMENT, achievement TEXT)"
        );
        setDb(db);
        const data = await db.getAllAsync("SELECT * FROM achievements");
        setAchievementsData(data);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    openDataBase();
  }, []);

  const saveToDatabse = async (achievementToSave) => {
    setIsLoading(false);
    try {
      if (achievementToSave) {
        const result = await db.runAsync(
          "INSERT INTO achievements (achievement) VALUES (?)",
          achievementToSave.trim()
        );
        setOpenModal(false);
        router.push("achievements");
      } else {
        Alert.alert("Insufficient Info", "Achievement not entered");
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
      <EnterSimpleDetails
        openModel={openModal}
        setOpenModel={setOpenModal}
        title={"ADD ACHIEVEMENTS"}
        placeholder={"Enter an achiements"}
        addButtonText={"Add"}
        value={achievement}
        setValue={setAchievment}
        handleAdd={(achievementToSave) => {
          saveToDatabse(achievementToSave);
        }}
      />
      <FlatList
        data={achievementsData}
        ListEmptyComponent={() => (
          <View className="items-center justify-center h-[80vh]">
            <Text className="text-xl font-psemibold text-white">
              No achievements entered yet
            </Text>
            <Text className="text-lg font-pregular text-gray-500">
              Add Achievements
            </Text>
          </View>
        )}
        renderItem={(item) => (
          <SimpleDetailsCard
            handleDelete={() => {
              setIsLoading(true);
              try {
                const result = db.runAsync(
                  "DELETE FROM achievements WHERE id=?",
                  [item.item.id]
                );
              } catch (error) {
                Alert.alert("Error", error.message);
              } finally {
                router.push("achievements");
                setIsLoading(false);
              }
            }}
            title={item.item.achievement}
          />
        )}
      />
      <TouchableOpacity
        className="bg-blue h-16 w-60 bottom-24 right-2 absolute rounded-xl  flex-row items-center"
        onPress={() => setOpenModal(true)}
      >
        <View className="justify-center items-center h-full ml-4">
          <Text className="text-4xl">+</Text>
        </View>
        <Text className="ml-3 text-xl font-pmedium">ADD ACHIEVEMENT</Text>
      </TouchableOpacity>
      <View className="absolute flex-row justify-between bottom-3 w-full">
        <TouchableOpacity
          className="w-[30%] border h-12 border-blue ml-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("interests")}
        >
          <Text className="text-blue text-xl font-pbold">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[30%] h-12 bg-blue mr-4 rounded-3xl items-center justify-center"
          onPress={async () => {
            try {
              await Templates(cvContext.cvIndex).then(async (res) => {
                const printer = await printAsync({
                  html: res[cvContext.currentTemplate],
                  base64: false,
                });
                await printer.finish();
              });
            } catch (error) {
              Alert.alert("Error!!", error.message);
            }
          }}
        >
          <Text className="text-white text-xl font-pregular">Preview</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default achievements;
