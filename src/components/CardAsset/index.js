import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CardAsset = ({id, apiItem}) => {
    return (
        <View>
            <Text id={id}>{apiItem.key}</Text>
        </View>
    );
}

export default CardAsset

const styles = StyleSheet.create({})
