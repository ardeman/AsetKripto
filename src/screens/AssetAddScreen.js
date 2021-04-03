import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { InputTextComponent, AlertComponent } from "../components";
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

    onRead = (e) => {
        this.setState({ errorMessage: null });
        let data = e.data.split("#");
        if (data.length === 2) {
            this.setState({ key: data[0] });
            this.setState({ secret: data[1] });
        } else {
            this.setState({ errorMessage: "QR Code tidak sesuai" });
            this.scanner.reactivate();
        }
    };

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
                    AlertComponent("Sukses", "Asset Tersimpan");
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
            <SafeAreaView style={styles.pages}>
                <ScrollView style={styles.pages}>
                    <QRCodeScanner
                        onRead={this.onRead}
                        cameraProps={{ ratio: "1:1" }}
                        ref={(ref) => {
                            this.scanner = ref;
                        }}
                    />

                    {(this.state.loading || this.state.errorMessage) && (
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
                    )}

                    <View style={styles.form}>
                        <InputTextComponent
                            label="API Key"
                            placeholder="Masukkan API Key"
                            onChangeText={this.onChangeText}
                            value={this.state.key}
                            stateName="key"
                        />
                        <InputTextComponent
                            label="API Secret"
                            placeholder="Masukkan API Secret"
                            onChangeText={this.onChangeText}
                            value={this.state.secret}
                            stateName="secret"
                        />
                        <InputTextComponent
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
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
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
        padding: 30,
    },
    error: {
        color: "darkred",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
    },
    form: {
        padding: 30,
    },
});
