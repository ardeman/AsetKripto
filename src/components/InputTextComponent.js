import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";

const InputTextComponent = ({
    label,
    placeholder,
    keyboardType,
    onChangeText,
    value,
    stateName,
    autoCapitalize,
    secureTextEntry,
}) => {
    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                style={styles.textInput}
                keyboardType={keyboardType}
                onChangeText={(text) => onChangeText(stateName, text)}
                value={value}
                autoCapitalize={autoCapitalize || "sentences"}
                secureTextEntry={secureTextEntry}
            />
        </>
    );
};

export default InputTextComponent;

const styles = StyleSheet.create({
    label: {
        fontSize: 10,
        marginBottom: 5,
        color: "gray",
        textTransform: "uppercase",
    },
    textInput: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "gray",
        height: 46,
        fontSize: 15,
        marginBottom: 30,
        paddingHorizontal: 0,
    },
});
