import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { CurrentTemplate } from "../../constants/currentTemplate";

import TemplatesJsonData from "../../constants/templatesData";
import CvTemplateCard from "../../components/cvTemplateCard";
import { router } from "expo-router";

const Templates = () => {
  const currentTemplateSetter = useContext(CurrentTemplate);
  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="ml-[3%]">
        <FlatList
          numColumns={2}
          data={TemplatesJsonData.templates}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <CvTemplateCard
              cvTemplateImg={item.item.image}
              handlePress={() => {
                currentTemplateSetter.setCurrentTemplate(item.item.id);
                router.push("personalDetails");
              }}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Templates;
