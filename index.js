import { registerRootComponent } from "expo";

import App from "./src/App";

import { LogBox, Platform } from "react-native";

if (Platform.OS !== "web") {
    LogBox.ignoreLogs(["Setting a timer"]);
}

registerRootComponent(App);
