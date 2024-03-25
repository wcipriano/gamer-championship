import React from "react"
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Home } from "../screens/home";
import { Usuario } from "../screens/cadastro/usuario";

export type RootTabPramList = {
  Home: undefined;
  Usuario: {id:string};
}
const Tab = createBottomTabNavigator<RootTabPramList>();

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
              title: 'Lista de usuários',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }
          }
        />
        <Tab.Screen 
          name="Usuario"
          component={Usuario} 
          options={
            {
              title: 'Cadastro de usuários',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-multiple-plus" color={color} size={26} />
              ),
            }
          }
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
