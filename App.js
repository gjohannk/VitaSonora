import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import Inicio from './screens/Inicio';import Entrar from './screens/Entrar';import Comunidade from './screens/Comunidade';import Sobre from './screens/Sobre';import Contato from './screens/Contato';import Historia from './screens/Historia';import NovoRelato from './screens/NovoRelato';
const Stack=createNativeStackNavigator();
export default function App(){return <SafeAreaProvider><NavigationContainer><StatusBar style="dark"/><Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'#def6df'},headerTintColor:'#287e35',headerTitleStyle:{fontWeight:'bold'},contentStyle:{backgroundColor:'#e8f6e8'}}}><Stack.Screen name="Início" component={Inicio} options={{headerShown:false}}/><Stack.Screen name="Entrar" component={Entrar} options={{title:'Cadastro e login (prévia)'}}/><Stack.Screen name="Comunidade" component={Comunidade}/><Stack.Screen name="Novo relato" component={NovoRelato}/><Stack.Screen name="Relato" component={Historia}/><Stack.Screen name="Sobre" component={Sobre}/><Stack.Screen name="Contato" component={Contato}/></Stack.Navigator></NavigationContainer></SafeAreaProvider>}
