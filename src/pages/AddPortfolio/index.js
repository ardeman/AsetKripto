import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class AddPortfolio extends Component {
    render() {
        return (
            <View style={styles.pages}>
                <Text>Tambah Portofolio</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        padding: 30
    }
})
