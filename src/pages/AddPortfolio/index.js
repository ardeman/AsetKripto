import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { InputData } from "../../components";

export default class AddPortfolio extends Component {
    render() {
        return (
            <View style={styles.pages}>
                <InputData label="API Key" placeholder="Masukkan API Key" />
                <InputData
                    label="API Secret"
                    placeholder="Masukkan API Secret"
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        padding: 30,
    },
    button: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
});
