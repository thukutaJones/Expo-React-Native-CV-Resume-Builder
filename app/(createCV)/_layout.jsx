import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";

import { Entypo } from "@expo/vector-icons";

export default CreateCVLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontSize: 25,
        },
      }}
      initialRouteName="templates"
    >
      <Stack.Screen
        name="templates"
        options={{
          title: "Choose a Template",
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("(tabs)")}
              className="w-10 h-10 items-center justify-center mr-10"
            >
              <Entypo name="home" size={25} color={"#31BCED"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="personalDetails"
        options={{
          title: "Personal Details",
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("(tabs)")}
              className="w-10 h-10 items-center justify-center mr-10"
            >
              <Entypo name="home" size={25} color={"#31BCED"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="workHistory"
        options={{
          title: "Work History",
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("(tabs)")}
              className="w-10 h-10 items-center justify-center mr-10"
            >
              <Entypo name="home" size={25} color={"#31BCED"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="education"
        options={{
          title: "Education",
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("(tabs)")}
              className="w-10 h-10 items-center justify-center mr-10"
            >
              <Entypo name="home" size={25} color={"#31BCED"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="skills"
        options={{
          title: "Skills",
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("(tabs)")}
              className="w-10 h-10 items-center justify-center mr-10"
            >
              <Entypo name="home" size={25} color={"#31BCED"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="objectives"
        options={{
          title: "Objectives",
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("(tabs)")}
              className="w-10 h-10 items-center justify-center mr-10"
            >
              <Entypo name="home" size={25} color={"#31BCED"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="references"
        options={{
          title: "References",
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("(tabs)")}
              className="w-10 h-10 items-center justify-center mr-10"
            >
              <Entypo name="home" size={25} color={"#31BCED"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="languages"
        options={{
          title: "Languages",
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("(tabs)")}
              className="w-10 h-10 items-center justify-center mr-10"
            >
              <Entypo name="home" size={25} color={"#31BCED"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="interests"
        options={{
          title: "Interests",
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("(tabs)")}
              className="w-10 h-10 items-center justify-center mr-10"
            >
              <Entypo name="home" size={25} color={"#31BCED"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="achievements"
        options={{
          title: "Achievements",
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("(tabs)")}
              className="w-10 h-10 items-center justify-center mr-10"
            >
              <Entypo name="home" size={25} color={"#31BCED"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};
