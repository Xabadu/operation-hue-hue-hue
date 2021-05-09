require("dotenv").config();

const tmi = require("tmi.js");

const { hexToRGB } = require("./lib/color_helpers");
const { updateColorLights, setColorLoop } = require("./lib/hue_commands");
const COLORS = require("./data/colors");

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: process.env.TWITCH_CHANNELS.split(","),
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  // !{command} rgb(255, 255, 255)
  // !{command} #ffffff
  // !{command} css color (check data/colors.js for available colors)
  let rgbColorMessage;
  if (message.startsWith(`!${process.env.LIGHTS_COMMAND} `)) {
    colorMessage = message.split(`!${process.env.LIGHTS_COMMAND} `)[1];

    if (COLORS.hasOwnProperty(colorMessage.toLowerCase())) {
      rgbColorMessage = hexToRGB(COLORS[colorMessage.toLowerCase()]);
    }
    if (colorMessage.startsWith("rgb")) {
      rgbColorMessage = colorMessage;
    }
    if (colorMessage.startsWith("#")) {
      rgbColorMessage = hexToRGB(colorMessage);
    }

    if (rgbColorMessage) {
      console.log("ohnoes", rgbColorMessage);
      updateColorLights(rgbColorMessage);
    }
  }
  // !loop
  if (message.startsWith(`!${process.env.LOOP_COMMAND}`)) {
    setColorLoop(true);
  }
});
