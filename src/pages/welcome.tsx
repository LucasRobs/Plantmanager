import React from 'react';

import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons'
import colors from '../styles/colors'
import wateringImg from '../assets/watering.png';
import fonts from '../styles/fonts'
export function Welcome() {
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIndentification')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencia {'\n'}
                suas plantas de{'\n'}
                forma fácil
            </Text>
                <Image source={wateringImg} style={styles.image} resizeMode="contain" />
                <Text style={styles.subtitle}>
                    Não esqueça mais dee regar suas {'\n'}
                    plantas. Nós cuidamos de lembrar você  {'\n'}
                    sempre que precisar.
            </Text>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress= {handleStart}
                >
                    <Feather name="chevron-right" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    wrapper:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 32
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 30,
        textAlign: 'center'
    }

});