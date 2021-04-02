import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CardAsset = ({ id, assetItem, navigation, removeData }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("DetailAsset", { id: id })}
        >
            <View>
                <Text style={styles.vendor}>{assetItem.vendor}</Text>
                <Text style={styles.aset}>Nilai Aset: x.xxx.xxx IDR</Text>
            </View>
            <View style={styles.icon}>
                <FontAwesomeIcon
                    icon={faEdit}
                    color={"orange"}
                    size={25}
                    onPress={() => navigation.navigate("EditAsset", { id: id })}
                />
                <FontAwesomeIcon
                    icon={faTimes}
                    color={"red"}
                    size={25}
                    onPress={() => removeData(id)}
                />
            </View>
        </TouchableOpacity>
    );
};

export default CardAsset;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    vendor: {
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "capitalize",
    },
    aset: {
        fontSize: 12,
        color: "gray",
    },
    icon: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
});