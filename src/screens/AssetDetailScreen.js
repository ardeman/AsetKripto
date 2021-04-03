import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Firebase from "../config/Firebase";

export default class AssetDetailScreen extends Component {
    _db = Firebase.firestore();

    constructor(props) {
        super(props);

        this.state = {
            asset: {},
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
                    asset: doc.assetItem,
                });

                this.props.navigation.setOptions({
                    title: assetItem.vendor,
                });
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }

    render() {
        const { asset } = this.state;
        return (
            <View style={styles.pages}>
                <Text>Nilai Aset : </Text>
                <Text style={styles.text}>x.xxx.xxx IDR</Text>

                <Text>Lifetime Profit : </Text>
                <Text style={styles.text}>x.xxx.xxx IDR</Text>

                <Text>Estimasi Open Order : </Text>
                <Text style={styles.text}>x.xxx.xxx IDR</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pages: {
        padding: 20,
        margin: 30,
        backgroundColor: "white",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
