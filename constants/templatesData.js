import images from "./images";

const templateImgs = [
  images.bg1,
  images.bg2,
  images.bg3,
  images.bg4,
  images.bg5,
  images.bg6,
  images.bg7,
  images.bg8,
  images.bg9,
];
var data = { templates: [] };
for (var i = 0; i < 9; i++) {
  data.templates.push({ id: `template_${i + 1}`, image: templateImgs[i] });
}
export default data;
