import React from 'react'
import {View, StyleSheet} from 'react-native'
import LottineView from 'lottie-react-native'
import loadAnimation from '../assets/load.json'
export function Load(){
    return (
        <View style={styles.container}>
            <LottineView
                source={loadAnimation}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    animation:{
        backgroundColor: 'transparent',
        width: 200,
        height: 200
    }
})