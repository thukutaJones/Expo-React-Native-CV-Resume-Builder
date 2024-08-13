import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../../components/EmptyState";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { router } from "expo-router";
import { useState, useEffect, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { CurrentTemplate } from "../../constants/currentTemplate";
import CVDisplayCard from "../../components/cvDisplayCard";
import Templates from "../../constants/templates";

const Home = () => {
  const [cvs, setCvs] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const cvIndex = useContext(CurrentTemplate);

  useEffect(() => {
    const getCVs = async () => {
      setIsLoading(true);
      try {
        const files = await FileSystem.readDirectoryAsync(
          FileSystem.documentDirectory + "/SQLite"
        );
        const dbs = files.filter((file) => file.endsWith(".db"));
        setCvs(dbs);
        cvIndex.setCvIndex(dbs.length);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getCVs();
  }, [refresh]);

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-primary">
        <ActivityIndicator size="large" color="#31BCED" />
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full bg-primary px-4">
      <View className="my-4">
        <Text className="text-4xl text-blue align-top">Welcome</Text>
      </View>
      <View className="ml-[3%]">
        <FlatList
          data={cvs}
          ListEmptyComponent={() => (
            <EmptyState
              handlePress={() => router.push("(createCV)/templates")}
            />
          )}
          numColumns={2}
          renderItem={(item) => (
            <CVDisplayCard
              cvName={item.item}
              handleEdit={() => {
                cvIndex.setCvIndex(Number(item.item.slice(2, -3)));
                router.push("(createCV)/templates");
              }}
              handleDelete={async () => {
                (await SQLite.openDatabaseAsync(item.item)).closeAsync();
                await SQLite.deleteDatabaseAsync(item.item);
                setRefresh(!refresh);
              }}
              handleShare={async () => {
                setIsLoading(true);
                const db = await SQLite.openDatabaseAsync(item.item);
                await db.runAsync(
                  "CREATE TABLE IF NOT EXISTS achievements (id INTEGER PRIMARY KEY AUTOINCREMENT, achievement TEXT)"
                );
                await db.runAsync(
                  "CREATE TABLE IF NOT EXISTS education (id INTEGER PRIMARY KEY AUTOINCREMENT, school TEXT, degree TEXT, startDate DATETIME, endDate DATETIME)"
                );
                await db.runAsync(
                  "CREATE TABLE IF NOT EXISTS interests (id INTEGER PRIMARY KEY AUTOINCREMENT, interest TEXT)"
                );
                await db.runAsync(
                  "CREATE TABLE IF NOT EXISTS languages_ (id INTEGER PRIMARY KEY AUTOINCREMENT, language TEXT)"
                );
                await db.runAsync(
                  "CREATE TABLE IF NOT EXISTS objectives (id INTEGER PRIMARY KEY AUTOINCREMENT, objective TEXT)"
                );
                await db.runAsync(
                  "CREATE TABLE IF NOT EXISTS personalDetails (id INTEGER PRIMARY KEY AUTOINCREMENT, fullName TEXT, profession TEXT, gender TEXT, nationality TEXT, dateOfBirth DATETIME, phone TEXT, email TEXT, profilePhoto TEXT, address_ TEXT, maritalStatus TEXT, religion TEXT, githubAccount TEXT, website TEXT, linkedIn TEXT, portfolio TEXT)"
                );
                await db.runAsync(
                  "CREATE TABLE IF NOT EXISTS references_ (id INTEGER PRIMARY KEY AUTOINCREMENT, refName TEXT, jobTitle TEXT, companyName TEXT, address_ TEXT, phone TEXT, email TEXT)"
                );
                await db.runAsync(
                  "CREATE TABLE IF NOT EXISTS skills (id INTEGER PRIMARY KEY AUTOINCREMENT, skill TEXT)"
                );
                await db.runAsync(
                  "CREATE TABLE IF NOT EXISTS workHistory (id INTEGER PRIMARY KEY AUTOINCREMENT, jobtitle TEXT, company TEXT, description TEXT, startDate DATETIME, endDate DATETIME)"
                );
                setIsLoading(false);
                try {
                  await Templates(item.item.slice(2, -3)).then(async (res) => {
                    const file = await printToFileAsync({
                      html: res[cvIndex.currentTemplate],
                      base64: false,
                    });
                    await shareAsync(file.uri, {
                      UTI: ".pdf",
                      mimeType: "application/pdf",
                    });
                  });
                } catch (error) {
                  Alert.alert("Error!!", error.message);
                }
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        />
      </View>
      {cvs.length ? (
        <TouchableOpacity
          className="bottom-8 absolute right-4"
          onPress={() => {
            cvIndex.setCvIndex(cvIndex.cvIndex);
            router.push("(createCV)/templates");
          }}
        >
          <AntDesign name="pluscircle" size={60} color={"#31BCED"} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default Home;
