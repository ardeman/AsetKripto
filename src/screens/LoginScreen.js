import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { InputTextComponent } from "../components";
import Firebase from "../config/Firebase";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorMessage: null,
            loading: false,
        };
    }

    onChangeText = (stateName, value) => {
        this.setState({ errorMessage: null });

        this.setState({
            [stateName]: value,
        });
    };

    handleLogin = () => {
        this.setState({ loading: true });
        const { email, password } = this.state;

        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .finally(() => {
                this.setState({ loading: false });
            })
            .catch((error) => this.setState({ errorMessage: error.message }));
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>{`Selamat Datang`}</Text>

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

                <View style={styles.form}>
                    <InputTextComponent
                        label="Email"
                        placeholder="Masukkan Alamat Email"
                        onChangeText={this.onChangeText}
                        value={this.state.email}
                        stateName="email"
                        autoCapitalize="none"
                    />

                    <InputTextComponent
                        label="Sandi"
                        placeholder="Masukkan Kata Sandi"
                        onChangeText={this.onChangeText}
                        value={this.state.password}
                        stateName="password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleLogin}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.toRegister}
                        onPress={() =>
                            this.props.navigation.navigate("Register")
                        }
                    >
                        <Text style={styles.registerQuestion}>
                            Belum memiliki akun?{" "}
                            <Text style={styles.registerLink}>
                                Daftar di sini
                            </Text>
                            .
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },
    greeting: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    processing: {
        justifyContent: "center",
        alignItems: "center",
        height: 72,
    },
    error: {
        color: "darkred",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
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
    toRegister: {
        alignSelf: "center",
        marginTop: 20,
    },
    registerQuestion: {
        fontSize: 13,
    },
    registerLink: {
        fontWeight: "bold",
        color: "black",
    },
});
