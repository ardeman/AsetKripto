import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as GestureHandler from "react-native-gesture-handler";

const { Swipeable } = GestureHandler;

const LeftActions = (id, navigation, removeData) => {
    return (
        <View style={styles.swipeOptions}>
            <View style={styles.flex}>
                <TouchableOpacity
                    style={styles.swipeButton}
                    onPress={() => removeData(id)}
                >
                    <Text style={styles.textDelete}>Hapus</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.flex}>
                <TouchableOpacity
                    style={styles.swipeButton}
                    onPress={() => navigation.navigate("AssetEdit", { id: id })}
                >
                    <Text style={styles.textEdit}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const AssetCardComponent = ({ id, assetItem, navigation, removeData }) => {
    return (
        <Swipeable
            renderLeftActions={() => LeftActions(id, navigation, removeData)}
        >
            <TouchableOpacity
                style={styles.container}
                onPress={() => navigation.navigate("AssetDetail", { id: id })}
            >
                <View>
                    <Text style={styles.vendor}>{assetItem.vendor}</Text>
                    <Text style={styles.aset}>Nilai Aset: x.xxx.xxx IDR</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
};

export default AssetCardComponent;

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "white",
        borderRadius: 5,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginHorizontal: 30,
    },
    vendor: {
        fontWeight: "bold",
        fontSize: 16,
    },
    aset: {
        fontSize: 12,
        color: "gray",
    },
    swipeOptions: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 20,
        marginHorizontal: 40,
    },
    swipeButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textDelete: {
        textTransform: "uppercase",
        color: "red",
    },
    textEdit: {
        textTransform: "uppercase",
        color: "orange",
    },
});
