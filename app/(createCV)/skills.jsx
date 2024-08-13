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

import EnterSimpleDetails from "../../components/enterSimpleDetails";
import sampleSkills from "../../constants/sampleSkills";
import SimpleDetailsCard from "../../components/simpleDetailsCard";

const skills = () => {
  const cvIndex = useContext(CurrentTemplate).cvIndex;

  const [openModal, setOpenModal] = useState(false);
  const [skill, setSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState();
  const [skillsData, setSkillsData] = useState([{}]);

  useEffect(() => {
    const openDataBase = async () => {
      setIsLoading(true);
      try {
        const db = await SQLite.openDatabaseAsync(`cv${cvIndex}.db`);
        await db.runAsync(
          "CREATE TABLE IF NOT EXISTS skills (id INTEGER PRIMARY KEY AUTOINCREMENT, skill TEXT)"
        );
        setDb(db);
        const data = await db.getAllAsync("SELECT * FROM skills");
        setSkillsData(data);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    openDataBase();
  }, []);

  const saveToDatabse = async (skillToSave) => {
    setIsLoading(false);
    try {
      if (skillToSave) {
        const result = await db.runAsync(
          "INSERT INTO skills (skill) VALUES (?)",
          skillToSave.trim()
        );
        setOpenModal(false);
        router.push("skills");
      } else {
        Alert.alert("Insufficient Info", "Skill not entered");
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
        title={"ADD SKILLS"}
        data={sampleSkills}
        targetItem={"skill"}
        placeholder={"Enter a skill"}
        addButtonText={"Add Skill"}
        value={skill}
        setValue={setSkill}
        handleAdd={(skillToSave) => {
          saveToDatabse(skillToSave);
        }}
      />
      <FlatList
        data={skillsData}
        ListEmptyComponent={() => (
          <View className="items-center justify-center h-[80vh]">
            <Text className="text-xl font-psemibold text-white">
              No Skills entered yet
            </Text>
            <Text className="text-lg font-pregular text-gray-500">
              Add your skills
            </Text>
          </View>
        )}
        renderItem={(item) => (
          <SimpleDetailsCard
            handleDelete={() => {
              setIsLoading(true);
              try {
                const result = db.runAsync("DELETE FROM skills WHERE id=?", [
                  item.item.id,
                ]);
              } catch (error) {
                Alert.alert("Error", error.message);
              } finally {
                router.push("skills");
                setIsLoading(false);
              }
            }}
            title={item.item.skill}
          />
        )}
      />
      <TouchableOpacity
        className="bg-blue h-16 w-44 bottom-24 right-2 absolute rounded-xl  flex-row items-center"
        onPress={() => setOpenModal(true)}
      >
        <View className="justify-center items-center h-full ml-4">
          <Text className="text-4xl">+</Text>
        </View>
        <Text className="ml-3 text-xl font-pmedium">ADD SKILL</Text>
      </TouchableOpacity>
      <View className="absolute flex-row justify-between bottom-3 w-full">
        <TouchableOpacity
          className="w-[30%] border h-12 border-blue ml-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("education")}
        >
          <Text className="text-blue text-xl font-pbold">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[30%] h-12 bg-blue mr-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("objectives")}
        >
          <Text className="text-white text-xl font-pregular">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default skills;
