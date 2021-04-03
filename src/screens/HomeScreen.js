import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
import { AssetCardComponent, AlertComponent } from "../components";
import Firebase from "../config/Firebase";

export default class HomeScreen extends Component {
    _db = Firebase.firestore();

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            displayName: "",
            uid: null,
            loading: false,
        };
    }

    componentDidMount() {
        this.retrieveData();
    }

    signOutUser = () => {
        Firebase.auth().signOut();
    };

    retrieveData = () => {
        const { uid, displayName } = Firebase.auth().currentUser;
        this.setState({
            uid,
            displayName,
            loading: true,
        });

        this._db
            .collection("users")
            .doc(uid)
            .collection("assets")
            .get()
            .then((querySnapshot) => {
                let snap = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                this.setState({
                    data: snap,
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    removeData = (id) => {
        AlertComponent("Info", "Anda yakin akan menghapus aset ini?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => {
                    this._db
                        .collection("users")
                        .doc(this.state.uid)
                        .collection("assets")
                        .doc(id)
                        .delete()
                        .then(() => {
                            this.retrieveData();
                            AlertComponent("Hapus", "Sukses menghapus data");
                        })
                        .catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                },
            },
        ]);
    };

    render() {
        const { displayName, loading, data } = this.state;

        return (
            <SafeAreaView style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.authUser}>
                        <Text>Hi, {displayName}.</Text>
                        <TouchableOpacity onPress={this.signOutUser}>
                            <Text style={styles.textLogout}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>List Aset</Text>
                    <View style={styles.line} />
                </View>

                <ScrollView style={styles.page}>
                    {loading ? (
                        <ActivityIndicator size="large" color="gray" />
                    ) : data.length > 0 ? (
                        data.map((value, index) => (
                            <AssetCardComponent
                                id={value.id}
                                key={index}
                                assetItem={value}
                                {...this.props}
                                removeData={this.removeData}
                            />
                        ))
                    ) : (
                        <Text>Tidak tersedia</Text>
                    )}
                </ScrollView>

                <View style={styles.wrapperButton}>
                    <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={() =>
                            this.props.navigation.navigate("AssetAdd")
                        }
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            size={20}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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
    textLogout: {
        textTransform: "uppercase",
    },
});
