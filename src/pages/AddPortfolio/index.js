import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { InputData } from "../../components";
import Firebase from "../../config/Firebase";

export default class AddPortfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiKey: "",
            apiSecret: "",
        };
    }

    onChangeText = (stateName, value) => {
        this.setState({
            [stateName]: value,
        });
    };

    onSubmit = () => {
        if (this.state.apiKey && this.state.apiSecret) {
            const apiRef = Firebase.database().ref("apis");
            const api = {
                apiKey: this.state.apiKey,
                apiSecret: this.state.apiSecret,
            };

            apiRef
                .push(api)
                .then((data) => {
                    Alert.alert("Sukses", "Api Tersimpan");
                    this.props.navigation.replace("Home");
                })
                .catch((error) => {
                    console.log("Error : ", error);
                });
        } else {
            Alert.alert("Error", "API Key dan API Secret wajib diisi");
        }
    };

    render() {
        return (
            <View style={styles.pages}>
                <InputData
                    label="API Key"
                    placeholder="Masukkan API Key"
                    onChangeText={this.onChangeText}
                    value={this.state.apiKey}
                    stateName="apiKey"
                />
                <InputData
                    label="API Secret"
                    placeholder="Masukkan API Secret"
                    onChangeText={this.onChangeText}
                    value={this.state.apiSecret}
                    stateName="apiSecret"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onSubmit()}
                >
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
