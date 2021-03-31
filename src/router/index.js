import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, AddPortfolio } from '../pages'

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: 'Portofolio' }}
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
