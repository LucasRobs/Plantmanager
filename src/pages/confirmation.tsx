import { useNavigation, useRoute } from '@react-navigation/core'
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

interface Params{
    title: string,
    subTitule: string,
    buttonTitule: string,
    icon: 'smile' | 'hug'
    nextScreen: string;
}

const emogis = {
    hug: '🤗',
    smile: '😁'
}

export function Confirmation(){
    const navigation = useNavigation();
    const routes =  useRoute();
    
    const {
        title,
        subTitule,
        buttonTitule,
        icon,
        nextScreen,
    } = routes.params as Params;

    function handleMoveOn(){
        navigation.navigate(nextScreen)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>{emogis[icon]}</Text>
                <Text style={styles.titule}>{title}</Text>

                <Text style={styles.SubTitule}>
                    {subTitule}
                </Text>
                <View style={styles.footer}>
                    <Button title={buttonTitule} onPress={handleMoveOn}/>
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