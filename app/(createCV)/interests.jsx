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

import EnterSimpleDetails from "../../components/enterSimpleDetails";
import SimpleDetailsCard from "../../components/simpleDetailsCard";
import sampleInterests from "../../constants/sampleInterests";

const Interests = () => {
  const cvIndex = useContext(CurrentTemplate).cvIndex;

  const [openModal, setOpenModal] = useState(false);
  const [interest, setInterest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState();
  const [interestsData, setInterestsData] = useState([{}]);

  useEffect(() => {
    const openDataBase = async () => {
      setIsLoading(true);
      try {
        const db = await SQLite.openDatabaseAsync(`cv${cvIndex}.db`);
        await db.runAsync(
          "CREATE TABLE IF NOT EXISTS interests (id INTEGER PRIMARY KEY AUTOINCREMENT, interest TEXT)"
        );
        setDb(db);
        const data = await db.getAllAsync("SELECT * FROM interests");
        setInterestsData(data);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    openDataBase();
  }, []);

  const saveToDatabse = async (interestToSave) => {
    setIsLoading(false);
    try {
      if (interestToSave) {
        const result = await db.runAsync(
          "INSERT INTO interests (interest) VALUES (?)",
          interestToSave.trim()
        );
        setOpenModal(false);
        router.push("interests");
      } else {
        Alert.alert("Insufficient Info", "Interest not entered");
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
        title={"ADD INTERESTS"}
        data={sampleInterests}
        targetItem={"interest"}
        placeholder={"Enter a hobby"}
        addButtonText={"Add"}
        value={interest}
        setValue={setInterest}
        handleAdd={(interestToSava) => {
          saveToDatabse(interestToSava);
        }}
      />
      <FlatList
        data={interestsData}
        ListEmptyComponent={() => (
          <View className="items-center justify-center h-[80vh]">
            <Text className="text-xl font-psemibold text-white">
              No Interests entered yet
            </Text>
            <Text className="text-lg font-pregular text-gray-500">
              Add Interests
            </Text>
          </View>
        )}
        renderItem={(item) => (
          <SimpleDetailsCard
            handleDelete={() => {
              setIsLoading(true);
              try {
                const result = db.runAsync("DELETE FROM interests WHERE id=?", [
                  item.item.id,
                ]);
              } catch (error) {
                Alert.alert("Error", error.message);
              } finally {
                router.push("interests");
                setIsLoading(false);
              }
            }}
            title={item.item.interest}
          />
        )}
      />
      <TouchableOpacity
        className="bg-blue h-16 w-56 bottom-24 right-2 absolute rounded-xl  flex-row items-center"
        onPress={() => setOpenModal(true)}
      >
        <View className="justify-center items-center h-full ml-4">
          <Text className="text-4xl">+</Text>
        </View>
        <Text className="ml-3 text-xl font-pmedium">ADD INTEREST</Text>
      </TouchableOpacity>
      <View className="absolute flex-row justify-between bottom-3 w-full">
        <TouchableOpacity
          className="w-[30%] border h-12 border-blue ml-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("languages")}
        >
          <Text className="text-blue text-xl font-pbold">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[30%] h-12 bg-blue mr-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("achievements")}
        >
          <Text className="text-white text-xl font-pregular">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Interests;
