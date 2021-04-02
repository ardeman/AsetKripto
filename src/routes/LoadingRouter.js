import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoadingScreen } from "../screens";

const Loading = createStackNavigator();

const LoadingRouter = () => {
    return (
        <Loading.Navigator>
            <Loading.Screen
                name="Loading"
                component={LoadingScreen}
                options={{ headerShown: false }}
            />
        </Loading.Navigator>
    );
};

export default LoadingRouter;
