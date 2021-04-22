import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import userImg from '../assets/lucas.png'
export function Header(){
    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.greeting}>Ola</Text>
                <Text style={styles.userName}>Robs</Text>
            </View>
            <Image source={userImg} style={styles.images} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:getStatusBarHeight() + 20,
        //backgroundColor: 'colors.background',
    },
    images:{
        width: 80,
        height: 80,
        borderRadius: 40
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }

})
