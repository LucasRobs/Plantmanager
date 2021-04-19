import React, { useState } from 'react';

import  { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet} from  'react-native';

import colors from '../../styles/colors';
import wateringImg from '../assets/watering.png';
import {Button} from '../components/Button';
export function Welcome(){
    const [visible, setVisible] = useState(false);
    function handleVisibility(){
        setVisible(!visible);
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencia {'\n'}
                suas plantas {'\n'}
                de forma fácil    
            </Text>
            {
                visible &&
                <Image source={wateringImg}/>
            }
            <Text style={styles.subtitle}>
                Não esqueça mais dee regar suas plantas.{'\n'}
                Nós cuidamos de lembrar você sempre que {'\n'}
                precisar.
            </Text>
            <Button title=">" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        textAlign:'center',
        color: colors.heading,
        marginTop: 38
    },
    subtitle:{
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal:20,
        color: colors.heading
    },
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
        paddingHorizontal: 10
    },
    image:{
        width: 282,
        height:284
    },
    buttonText:{
        textAlign:'center',
        color: colors.white,
        fontSize: 24
    }

});