import React from 'react'
import { TouchableOpacity, Text,  StyleSheet, TouchableOpacityProps} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
interface ButtonProps extends TouchableOpacityProps{
    title: string;
}
export function Button({ title , ...rest}: ButtonProps){
    return (
        <TouchableOpacity 
                style={styles.button} 
                activeOpacity={0.8}
                {...rest}
                >
                    <Text 
                        style={styles.buttonText}
                    >
                        {title}
                    </Text>
            </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        paddingHorizontal: 10, 
        alignItems: 'center',
        width:'100%'
    },
    buttonText:{
        textAlign:'center',
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading
    },

});