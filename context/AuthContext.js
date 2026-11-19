import React,{createContext,useContext,useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../services/api';
const AuthContext=createContext(null);
export function AuthProvider({children}){const [usuario,setUsuario]=useState(null),[carregando,setCarregando]=useState(true);
 useEffect(()=>{(async()=>{try{if(await AsyncStorage.getItem('vs_token'))setUsuario(await api('/api/auth/me'));}catch(e){if(e.status===401)await AsyncStorage.removeItem('vs_token');}finally{setCarregando(false)}})()},[]);
 async function guardar(dados){await AsyncStorage.setItem('vs_token',dados.token);setUsuario(dados.usuario);}
 async function entrar(identificador,senha){const dados=await api('/api/auth/login',{method:'POST',body:{identificador,senha},auth:false});await guardar(dados)}
 async function cadastrar(info){const dados=await api('/api/auth/cadastro',{method:'POST',body:info,auth:false});await guardar(dados)}
 async function sair(){await AsyncStorage.removeItem('vs_token');setUsuario(null)}
 return <AuthContext.Provider value={{usuario,carregando,entrar,cadastrar,sair}}>{children}</AuthContext.Provider>;
}
export function useAuth(){return useContext(AuthContext)}
