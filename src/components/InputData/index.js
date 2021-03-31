import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const InputData = ({ label, placeholder, keyboardType }) => {
    return (
        <>
            <Text style={styles.label}>{label} :</Text>
            <TextInput
                placeholder={placeholder}
                style={styles.textInput}
                keyboardType={keyboardType}
            />
        </>
    );
};

export default InputData;

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});
