import React, { Component } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import Firebase from "../../config/Firebase";

export default class Loading extends Component {
    componentDidMount() {
        Firebase.auth().onAuthStateChanged((user) => {
            this.props.navigation.navigate(user ? "Home" : "Login");
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sedang memuat...</Text>
                <ActivityIndicator size="large" color="gray" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
