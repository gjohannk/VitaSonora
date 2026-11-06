import React,{useCallback,useState} from 'react';
import {Text,View,TextInput,StyleSheet,ActivityIndicator,Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Page,Heading,Card,Button} from '../components/UI';
import {api} from '../services/api';
const temas=['Bem-estar','Memórias','Infância','Outros'];
export default function Comunidade({navigation}){
 const [relatos,setRelatos]=useState([]),[loading,setLoading]=useState(true),[erro,setErro]=useState('');
 const carregar=useCallback(async()=>{setLoading(true);try{setRelatos(await api('/api/relatos'));setErro('');}catch(e){setErro(e.message)}finally{setLoading(false)}},[]);
 useFocusEffect(useCallback(()=>{carregar()},[carregar]));
 return <Page><Heading>Comunidade</Heading><Text style={s.intro}>A música transforma vidas. Leia relatos reais e compartilhe sua história.</Text><Button label="Compartilhar um relato" onPress={()=>navigation.navigate('Novo relato')}/><Button outline label="Atualizar relatos" onPress={carregar}/>{loading&&<ActivityIndicator color="#287e35"/>}{!!erro&&<Text style={s.error}>{erro}</Text>}{!loading&&!relatos.length&&!erro&&<Text>Nenhum relato ainda. Seja o primeiro!</Text>}{relatos.map(item=><Card key={item.id} title={item.titulo} onPress={()=>navigation.navigate('Relato',{id:item.id})}>{`${item.autor_nome} · ${item.tema}\n${item.conteudo.slice(0,180)}`}</Card>)}</Page>;
}
const s=StyleSheet.create({intro:{fontSize:16,marginBottom:14,color:'#445'},error:{color:'#b42318',margin:12}});
