import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { InputTextComponent, AlertComponent } from "../components";
import Firebase from "../config/Firebase";

export default class AssetEditScreen extends Component {
    _db = Firebase.firestore();

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

    componentDidMount() {
        const { uid } = Firebase.auth().currentUser;
        this.setState({ uid });

        this._db
            .collection("users")
            .doc(uid)
            .collection("assets")
            .doc(this.props.route.params.id)
            .get()
            .then((doc) => {
                let data = doc.data() || {};
                let assetItem = { ...data };

                this.setState({
                    key: assetItem.key,
                    secret: assetItem.secret,
                    vendor: assetItem.vendor,
                });
            });
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

            const asset = {
                key: this.state.key,
                secret: this.state.secret,
                vendor: this.state.vendor,
            };

            this._db
                .collection("users")
                .doc(this.state.uid)
                .collection("assets")
                .doc(this.props.route.params.id)
                .set(asset, { merge: true })
                .then(() => {
                    AlertComponent("Sukses", "Asset Terupdate");
                    this.props.navigation.replace("Home");
                })
                .catch((error) => {
                    this.setState({ errorMessage: error.message });
                    console.error("Error writing document: ", error);
                })
                .finally(() => {
                    this.setState({ loading: false });
                });
        } else {
            this.setState({
                errorMessage: "API Key, API Secret dan Vendor wajib diisi",
            });
        }
    };

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
