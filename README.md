# Operation Hue Hue Hue

This app lets your Twitch viewers interact with your Philips Hue Lights using the chat.

## Installation

1. Clone this repo

2. Install dependencies

```bash
  npm install
```

3. Rename `env.example` to `.env` and edit this values:

- `HUB_IP`: This is the IP address for your Philips Hue Hub. You can find yours accessing [this URL](https://discovery.meethue.com/) from the network your hub is on.
- `HUB_USER`: The user to access your hub. If you don't have one yet, you'll have to create one following the instructions on the [Philips Hue Developer portal](https://developers.meethue.com/).
- `TWITCH_CHANNELS`: List of Twitch channels you want to listen to for messages, separated by commas.
- `LIGHTS_COMMAND`: The command the app will listen to for light updates.
- `LOOP_COMMAND`: The command the app will listen to enable the color loop.
- `HUE_RESOURCE`: The type of resource you want to manage with the app (lights or groups)
- `HUE_RESOURCE_ID`: The id of the light you want to update with the messages.
- `HUE_TRANSITION_TIME`: Transition time for the light updates.

4. Run the app locally

```bash
npm start
```

## Usage/Examples

The app supports 3 types of color inputs:

- hex: `#000000` to `#ffffff`
- rgb: `rgb(0, 0, 0)` to `rgb(255, 255, 255)`
- CSS colors: Anything from [this list](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)

```bash
// hex
!{YOUR-COMMAND} #ff6347

// rgb
!{YOUR-COMMAND} rgb(255, 99, 71)

// CSS colors
!{YOUR-COMMAND} tomato
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
