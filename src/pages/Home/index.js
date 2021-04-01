import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { CardAsset } from "../../components";
import Firebase from "../../config/Firebase";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apis: {},
            apisKey: [],
            email: "",
            displayName: "",
            loading: false,
        };
    }

    componentDidMount() {
        this.retrieveData();

        const { email, displayName } = Firebase.auth().currentUser;
        this.setState({ email, displayName });
    }

    signOutUser = () => {
        Firebase.auth().signOut();
    };

    retrieveData = () => {
        this.setState({ loading: true });

        Firebase.database()
            .ref("apis")
            .once("value", (querySnapShot) => {
                let data = querySnapShot.val() || {};
                let apiItem = { ...data };

                this.setState({
                    apis: apiItem,
                    apisKey: Object.keys(apiItem),
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    removeData = (id) => {
        Alert.alert("Info", "Anda yakin akan menghapus aset ini?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => {
                    Firebase.database().ref(`apis/${id}`).remove();
                    this.retrieveData();
                    Alert.alert("Hapus", "Sukses menghapus data");
                },
            },
        ]);
    };

    render() {
        const { apis, apisKey } = this.state;

        return (
            <View style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.authUser}>
                        <Text style={styles.currentUser}>
                            Hi, {this.state.displayName}.
                        </Text>
                        <TouchableOpacity
                            style={styles.logout}
                            onPress={this.signOutUser}
                        >
                            <Text style={styles.textLogout}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Daftar Aset</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.listApi}>
                    {this.state.loading && (
                        <ActivityIndicator size="large" color="gray" />
                    )}

                    {apisKey.length > 0 ? (
                        apisKey.map((key) => (
                            <CardAsset
                                id={key}
                                key={key}
                                apiItem={apis[key]}
                                {...this.props}
                                removeData={this.removeData}
                            />
                        ))
                    ) : (
                        <Text>Tidak tersedia</Text>
                    )}
                </View>

                <View style={styles.wrapperButton}>
                    <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={() =>
                            this.props.navigation.navigate("AddAsset")
                        }
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            size={20}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    line: {
        borderWidth: 1,
        marginTop: 10,
    },
    listApi: {
        paddingHorizontal: 30,
        marginTop: 20,
    },
    wrapperButton: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 30,
    },
    btnAdd: {
        padding: 20,
        backgroundColor: "skyblue",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    authUser: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    currentUser: {},
    logout: {},
    textLogout: {
        textTransform: "uppercase",
    },
});
