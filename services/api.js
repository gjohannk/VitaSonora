import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Troque pelo IP local do computador se usar Expo Go no celular.
const DEFAULT_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
export const API_URL = process.env.EXPO_PUBLIC_API_URL || DEFAULT_URL;
export async function api(path,{method='GET',body,auth=true}={}){
 const token = auth ? await AsyncStorage.getItem('vs_token') : null;
 let response;
 try {response = await fetch(`${API_URL}${path}`,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{})});}
 catch {throw new Error('Sem conexão com a API. Confira o IP do servidor e a rede.');}
 const data=await response.json().catch(()=>({}));
 if(!response.ok) throw new Error(data.erro||`Erro HTTP ${response.status}`);
 return data;
}
