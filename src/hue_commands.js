const axios = require("axios");
const Color = require("color");

const { HSB } = require("./hue_colors");

const HUE_BASE_PATH = `http://${process.env.HUB_IP}/api/${process.env.HUB_USER}`;
const HUE_RESOURCE = process.env.HUE_RESOURCE;
const HUE_RESOURCE_ID = process.env.HUE_RESOURCE_ID;
const HUE_TRANSITION_TIME = process.env.HUE_TRANSITION_TIME;

exports.updateColorLights = (
  color,
  resource_id = HUE_RESOURCE_ID,
  resource = HUE_RESOURCE
) => {
  const action = resource == "lights" ? "state" : "action";
  const rgbColor = Color.rgb(color);
  const [h, s, v] = rgbColor.hsv().color;
  const [hue, sat, bri] = HSB(h, s, v);

  axios({
    method: "put",
    url: `${HUE_BASE_PATH}/${resource}/${resource_id}/${action}`,
    data: {
      on: true,
      hue,
      sat,
      bri,
      transitiontime: HUE_TRANSITION_TIME || 10,
    },
  })
    .then((res) => console.log("res", res.status))
    .catch((err) => console.log(err));
};

exports.setColorLoop = (
  state = true,
  resource_id = HUE_RESOURCE_ID,
  resource = HUE_RESOURCE
) => {
  const action = resource == "lights" ? "state" : "action";
  axios({
    method: "put",
    url: `${HUE_BASE_PATH}/${resource}/${resource_id}/${action}`,
    data: {
      on: state,
      effect: "colorloop",
    },
  })
    .then((res) => console.log("res", res.status))
    .catch((err) => console.log(err));
};
