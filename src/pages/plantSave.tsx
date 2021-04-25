import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    TouchableOpacity,
    Image
} from 'react-native'
import { SvgFromUri } from 'react-native-svg';
import { Button } from '../components/Button'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core'
import { loadPlant, PlantProps, savePlant } from '../libs/storage';
import DataTimePicker, { Event } from '@react-native-community/datetimepicker'
import waterDrop from '../assets/waterdrop.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';
interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const [selectedDataTime, setSelectedDataTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

    const route = useRoute();
    const { plant } = route.params as Params;

    function handleOpenDataTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)
    }
    const navigation = useNavigation();

    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDataTime
            })
            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subTitule: 'Fique tranquilo que sempre vamos lembrar voc de cuidar da sua plantinha com muito cuidado.',
                buttonTitule: 'Muito Obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants',
            })
        } catch {
            Alert.alert('não foi possivel salvar!');
        }
    }

    function handleChangeTime(event: Event, dataTime: Date | undefined) {
        if (Platform.OS == 'android') {
            setShowDatePicker(oldState => !oldState);
        }
        if (dataTime && isBefore(dataTime, new Date())) {
            setSelectedDataTime(new Date());
            return Alert.alert('Escolha ma hora no futuro!');
        }
        if (dataTime)
            setSelectedDataTime(dataTime);
    }
    return (
        <ScrollView 
            showsVerticalScrollIndicator= {false}
            contentContainerStyle= {styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri uri={plant.photo} height={150} width={150} />
                    <Text style={styles.plantName}>{plant.name}</Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image source={waterDrop} style={styles.tipImage}></Image>
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário oara ser lembrado:
            </Text>
                    {showDatePicker && (
                        <DataTimePicker
                            value={selectedDataTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )}
                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                                onPress={handleOpenDataTimePickerForAndroid}
                                style={styles.dateTimePickerButton}
                            >
                                <Text style={styles.dateTimePickerText}>
                                    {`Mudar ${format(selectedDataTime, 'HH:mm')} `}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                    <Button title="Cadastrar planta" onPress={handleSave} />
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 25,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 80
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    }
})
