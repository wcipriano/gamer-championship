import React from "react"
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Home } from "../screens/home";
import { Team } from "../screens/cadastro/team";

export type RootTabParamList = {
  Home: undefined
  Team: {id:number}
}
const Tab = createBottomTabNavigator<RootTabParamList>();

const MyTheme = {
  ...DefaultTheme, 
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    backgroud: 'white'
  }
}

export const Routes = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={
            {
              title: 'Times',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="basketball" color={color} size={26} />
              ),
            }
          }
        />
        <Tab.Screen 
          listeners={({ navigation }) => ({
            focus: () => {
              navigation.setParams({id: undefined});
            }
          })}
          name="Team"
          component={Team} 
          options={
            {
              title: 'Cadastro',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="plus-box" color={color} size={26} />
              ),
            }
          }
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
