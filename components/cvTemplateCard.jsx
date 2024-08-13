import { TouchableOpacity, Image } from "react-native";

const CvTemplateCard = ({ cvTemplateImg, handlePress }) => {
  return (
    <>
      {cvTemplateImg && (
        <TouchableOpacity
          className="w-[47%] h-72  border-blue mr-[3%] mt-[3%] border p-1"
          onPress={handlePress}
        >
          <Image
            source={cvTemplateImg}
            resizeMode="contain"
            className="h-full w-full"
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default CvTemplateCard;
