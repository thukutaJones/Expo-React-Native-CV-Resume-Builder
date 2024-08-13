import { Tabs } from "expo-router";
import { View } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const TabsLayout = () => {
  const TabBarIcon = ({ color, size, name, focused }) => {
    return (
      <View className="items-center justify-center">
        <MaterialCommunityIcons name={name} size={32} color={color} />
        {focused && <FontAwesome5 name="minus" size={20} color={color} />}
      </View>
    );
  };
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "#31BCED",
        tabBarInactiveColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          borderTopColor: "#31BCED",
          backgroundColor: "#161622",
        },
      }}
    >
      <Tabs.Screen
        name="templates"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              color={color}
              size={size}
              name="newspaper-variant"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              color={color}
              size={size}
              name="home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              color={color}
              size={size}
              name="cog"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
