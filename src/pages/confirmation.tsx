import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
}from 'react-native'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
export function Confirmation(){
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>😁</Text>
                <Text style={styles.titule}>Prontinho</Text>

                <Text style={styles.SubTitule}>
                    Agora vamos começar a cuidar das suas {'\n'}
                    plantas com muito cuidado
                </Text>
                <View style={styles.footer}>
                    <Button title="Começar"/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    titule:{
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },
    SubTitule:{
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical:20
    },
    content:{
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        padding: 30
    },
    emoji:{
        fontSize: 78,
        textAlign: 'center',

    },
    footer:{
        width: '100%',
        paddingHorizontal: 50,
        paddingTop: 20
    }
})