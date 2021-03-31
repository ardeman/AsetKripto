import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../pages/Home'
import AddPortfolio from '../pages/AddPortfolio'

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: 'Beranda' }}
            />
            <Stack.Screen
                name="AddPortfolio"
                component={AddPortfolio}
                options={{ title: 'Tambah Portofolio' }}
            />
        </Stack.Navigator>
    );
};

export default Router;
