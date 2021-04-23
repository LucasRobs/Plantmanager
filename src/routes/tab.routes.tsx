import  React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '../styles/colors';
import { PlantSelect } from '../pages/plantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/myPlants';

const AppTab = createBottomTabNavigator();
export default  () => {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                labelPosition: 'beside-icon',
                inactiveTintColor: colors.heading,
                style:{
                    paddingVertical: 20,
                    height: 88
                }
            }}>
                <AppTab.Screen
                    name="Nova Planta"
                    component={PlantSelect}
                    options={{
                        tabBarIcon:(({ size, color}) => (
                            <MaterialIcons
                                name="add-circle-outline"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />
                <AppTab.Screen
                    name="Minhas Planta"
                    component={MyPlants}
                    options={{
                        tabBarIcon:(({ size, color}) => (
                            <MaterialIcons
                                name="format-list-bulleted"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />
        </AppTab.Navigator>
    )
}