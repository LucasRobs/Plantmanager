import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load'
import {useNavigation } from '@react-navigation/core'
import api from '../services/api';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { PlantProps } from '../libs/storage';
interface EnviromentProps{
    key: string,
    title: string
}

export function PlantSelect() {
    const [eviroments, setEviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPants, setFilteredPants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoadding] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();
    function handleEnrivomentSelected(index: string){
        setEnviromentSelected(index);
        if(index == 'all')
            return setFilteredPants(plants);
        const filtered = plants.filter(plant =>
                plant.environments.includes(index)
            )
        setFilteredPants(filtered);
    }

    function handleFetchMore(distance: number){
        if(distance<1) return;
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants()
    }

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSave', {plant});
    }

    async function fetchPlants(){
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        if(!data) return setLoadding(true);
        if(page > 1){
            setPlants(oldValue => [...oldValue,...data])
            setFilteredPants(oldValue=> [...oldValue,...data])
        }else{
            setPlants(data);
            setFilteredPants(data);
        }
        setLoadding(false);
        setLoadingMore(false);
    }

    useEffect(()=>{
        async function fetchEnviroment(){
            try{
                const { data } = await api.get('plants_environments?_sort=title&asc');
                setEviroments([{
                    key:'all',
                    title: 'Todos',
                },...data]);
            }catch(error){throw new Error(error);}
        }
        fetchEnviroment();
    },[])

    useEffect(()=>{
        fetchPlants();
    },[])
    if(loading)return <Load/>
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                    <Text style={styles.titule}>
                        Em qual ambiente
                    </Text>
                    <Text style={styles.subTitule}>
                        você quer colocar sua planta?
                    </Text>
            </View>
            <View>
                <FlatList
                    data={eviroments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({item})=>(
                    <EnviromentButton 
                    title={item.title} 
                    active={item.key === enviromentSelected}
                    onPress={() => handleEnrivomentSelected(item.key)}
                    />)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                data={filteredPants}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item})=>(
                    <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)}/>
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onEndReachedThreshold={0.1}
                onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                ListFooterComponent={
                    loadingMore ?
                    <ActivityIndicator color={colors.green}/>
                    : <></>
                }
                />
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 20
    },
    titule: {
        fontSize: 17,
       color: colors.heading,
        lineHeight: 20,
        marginTop: 15,
        fontFamily: fonts.heading
    },
    subTitule: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    enviromentList:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
})