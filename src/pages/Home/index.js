import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { CardAsset } from "../../components";
import Firebase from "../../config/Firebase";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apis: {},
            apisKey: [],
        };
    }

    componentDidMount() {
        this.retrieveData();
    }

    retrieveData = () => {
        Firebase.database()
            .ref("apis")
            .once("value", (querySnapShot) => {
                let data = querySnapShot.val() || {};
                let apiItem = { ...data };

                this.setState({
                    apis: apiItem,
                    apisKey: Object.keys(apiItem),
                });
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
                    <Text style={styles.title}>Daftar Aset</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.listApi}>
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
                        <Text>Daftar Kosong</Text>
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
});
