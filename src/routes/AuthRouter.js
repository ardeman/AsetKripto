import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegisterScreen } from "../screens";

const Auth = createStackNavigator();

const AuthRouter = () => {
    return (
        <Auth.Navigator>
            <Auth.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Auth.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
        </Auth.Navigator>
    );
};

export default AuthRouter;
