import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    HomeScreen,
    AssetAddScreen,
    AssetDetailScreen,
    AssetEditScreen,
} from "../screens";

const App = createStackNavigator();

const AppRouter = () => {
    return (
        <App.Navigator>
            <App.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <App.Screen
                name="AssetAdd"
                component={AssetAddScreen}
                options={{ title: "Tambah Aset" }}
            />
            <App.Screen
                name="AssetDetail"
                component={AssetDetailScreen}
                options={{ title: "Detail Aset" }}
            />
            <App.Screen
                name="AssetEdit"
                component={AssetEditScreen}
                options={{ title: "Ubah Aset" }}
            />
        </App.Navigator>
    );
};

export default AppRouter;
