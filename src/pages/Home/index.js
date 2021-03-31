import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default class Home extends Component {
    render() {
        return (
            <View style={styles.page}>
                <Text>Halaman Home</Text>
                <View style={styles.wrapperButton}>
                    <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={() =>
                            this.props.navigation.navigate("AddPortfolio")
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