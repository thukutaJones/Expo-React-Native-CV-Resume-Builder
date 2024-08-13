import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useContext } from "react";
import { CurrentTemplate } from "../../constants/currentTemplate";

import * as SQLite from "expo-sqlite";

const objectivs = () => {
  const cvIndex = useContext(CurrentTemplate).cvIndex;

  const [objective, setObjective] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState();

  useEffect(() => {
    const openDataBase = async () => {
      setIsLoading(true);
      try {
        const db = await SQLite.openDatabaseAsync(`cv${cvIndex}.db`);
        await db.runAsync(
          "CREATE TABLE IF NOT EXISTS objectives (id INTEGER PRIMARY KEY AUTOINCREMENT, objective TEXT)"
        );
        setDb(db);
        const data = await db.getAllAsync("SELECT * FROM objectives");
        if (data.length) {
          setObjective(data[0].objective);
        } else {
          const res = await db.runAsync(
            "INSERT INTO objectives (objective) VALUES (?)",
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

  const saveToDatabse = async () => {
    setIsLoading(false);
    try {
      if (objective) {
        const result = await db.runAsync(
          "UPDATE objectives SET objective=? WHERE id=?",
          [objective.trim(), 1]
        );
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      router.push("references");
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
    <SafeAreaView className="h-full bg-primary px-2">
      <TextInput
        className="border text-lg justify-start px-2 py-2 max-h-36 border-blue text-white"
        placeholder="objectives"
        placeholderTextColor={"gray"}
        multiline={true}
        textAlignVertical="top"
        scrollEnabled={true}
        value={objective}
        numberOfLines={6}
        onChangeText={(text) => setObjective(text)}
      />
      <View className="absolute flex-row justify-between bottom-3 w-full">
        <TouchableOpacity
          className="w-[30%] border h-12 border-blue ml-4 rounded-3xl items-center justify-center"
          onPress={() => router.push("skills")}
        >
          <Text className="text-blue text-xl font-pbold">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[30%] h-12 bg-blue mr-4 rounded-3xl items-center justify-center"
          onPress={saveToDatabse}
        >
          <Text className="text-white text-xl font-pregular">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default objectivs;
