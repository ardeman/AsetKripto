import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { InputData } from "../../components";
import Firebase from "../../config/Firebase";

export default class EditAsset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: "",
            secret: "",
            vendor: "",
        };
    }

    componentDidMount() {
        Firebase.database()
            .ref(`apis/${this.props.route.params.id}`)
            .once("value", (querySnapShot) => {
                let data = querySnapShot.val() || {};
                let apiItem = { ...data };

                this.setState({
                    key: apiItem.key,
                    secret: apiItem.secret,
                    vendor: apiItem.vendor,
                });
            });
    }

    onChangeText = (stateName, value) => {
        this.setState({
            [stateName]: value,
        });
    };

    onSubmit = () => {
        if (this.state.key && this.state.secret && this.state.vendor) {
            const apiRef = Firebase.database().ref(
                `apis/${this.props.route.params.id}`
            );
            const api = {
                key: this.state.key,
                secret: this.state.secret,
                vendor: this.state.vendor,
            };

            apiRef
                .update(api)
                .then((data) => {
                    Alert.alert("Sukses", "Api Terupdate");
                    this.props.navigation.replace("Home");
                })
                .catch((error) => {
                    console.log("Error : ", error);
                });
        } else {
            Alert.alert("Error", "API Key, API Secret dan Vendor wajib diisi");
        }
    };

    render() {
        return (
            <View style={styles.pages}>
                <InputData
                    label="API Key"
                    placeholder="Masukkan API Key"
                    onChangeText={this.onChangeText}
                    value={this.state.key}
                    stateName="key"
                />
                <InputData
                    label="API Secret"
                    placeholder="Masukkan API Secret"
                    onChangeText={this.onChangeText}
                    value={this.state.secret}
                    stateName="secret"
                />
                <InputData
                    label="Vendor"
                    placeholder="Masukkan Vendor"
                    onChangeText={this.onChangeText}
                    value={this.state.vendor}
                    stateName="vendor"
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
