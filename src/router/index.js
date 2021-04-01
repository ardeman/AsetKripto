import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, AddAsset, DetailAsset, EditAsset } from "../pages";

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddAsset"
                component={AddAsset}
                options={{ title: "Tambah Aset" }}
            />
            <Stack.Screen
                name="DetailAsset"
                component={DetailAsset}
                options={{ title: "Detil Aset" }}
            />
            <Stack.Screen
                name="EditAsset"
                component={EditAsset}
                options={{ title: "Ubah Aset" }}
            />
        </Stack.Navigator>
    );
};

export default Router;
