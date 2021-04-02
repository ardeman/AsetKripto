import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { InputData } from "../components";
import Firebase from "../config/Firebase";

export default class AssetAddScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: "",
            secret: "",
            vendor: "",
            errorMessage: null,
            loading: false,
            uid: null,
        };
    }

    onChangeText = (stateName, value) => {
        this.setState({
            errorMessage: null,
            [stateName]: value,
        });
    };

    onSubmit = () => {
        if (this.state.key && this.state.secret && this.state.vendor) {
            this.setState({ loading: true });

            const assetRef = Firebase.database().ref(
                `users/${this.state.uid}/assets`
            );
            const asset = {
                key: this.state.key,
                secret: this.state.secret,
                vendor: this.state.vendor,
            };

            assetRef
                .push(asset)
                .then(() => {
                    Alert.alert("Sukses", "Asset Tersimpan");
                    this.props.navigation.replace("Home");
                })
                .finally(() => {
                    this.setState({ loading: false });
                })
                .catch((error) => {
                    this.setState({ errorMessage: error.message });
                });
        } else {
            this.setState({
                errorMessage: "API Key, API Secret dan Vendor wajib diisi",
            });
        }
    };

    componentDidMount() {
        const { uid } = Firebase.auth().currentUser;
        this.setState({ uid });
    }

    render() {
        return (
            <View style={styles.pages}>
                <View style={styles.processing}>
                    {this.state.loading && (
                        <ActivityIndicator size="large" color="gray" />
                    )}

                    {this.state.errorMessage && (
                        <Text style={styles.error}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                </View>

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
        marginTop: 10,
        backgroundColor: "black",
        borderRadius: 5,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        textTransform: "uppercase",
    },
    processing: {
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        color: "darkred",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
});
