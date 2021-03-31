import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Firebase from "../../config/Firebase";

export default class DetailAsset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            api: {},
        };
    }

    componentDidMount() {
        Firebase.database()
            .ref(`apis/${this.props.route.params.id}`)
            .once("value", (querySnapShot) => {
                let data = querySnapShot.val() || {};
                let apiItem = { ...data };

                this.setState({
                    api: apiItem,
                });
            });
    }

    render() {
        const { api } = this.state;
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
