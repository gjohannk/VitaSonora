import React,{useCallback,useState} from 'react';
import {Text,StyleSheet,ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Page,Heading,Card,Button} from '../components/UI';
import {api} from '../services/api';
import {useAuth} from '../context/AuthContext';
export default function Comunidade({navigation}){
 const [relatos,setRelatos]=useState([]),[loading,setLoading]=useState(true),[erro,setErro]=useState('');const {usuario,sair}=useAuth();
 const carregar=useCallback(async()=>{setLoading(true);try{setRelatos(await api('/api/relatos'));setErro('')}catch(e){setErro(e.message)}finally{setLoading(false)}},[]);
 useFocusEffect(useCallback(()=>{carregar()},[carregar]));
 return <Page><Heading>Comunidade</Heading><Text style={s.intro}>Histórias sobre música, memórias e bem-estar.</Text>{usuario?<><Text>Olá, {usuario.nome}! Perfil: {usuario.nivel}</Text><Button label="Compartilhar minha história" onPress={()=>navigation.navigate('Novo relato')}/><Button outline label="Sair da conta" onPress={sair}/>{usuario.nivel==='admin'&&<Button outline label="Gerenciar usuários" onPress={()=>navigation.navigate('Usuários')}/>}</>:<Button label="Entrar para publicar e comentar" onPress={()=>navigation.navigate('Entrar')}/>}<Button outline label="Atualizar" onPress={carregar}/>{loading&&<ActivityIndicator color="#287e35"/>}{!!erro&&<Text style={s.error}>{erro}</Text>}{!loading&&!relatos.length&&!erro&&<Text>Nenhum relato publicado.</Text>}{relatos.map(r=><Card key={r.id} title={r.titulo} onPress={()=>navigation.navigate('Relato',{id:r.id})}>{`${r.autor_nome} · ${r.tema}\n${r.conteudo.slice(0,180)}`}</Card>)}</Page>
}
const s=StyleSheet.create({intro:{fontSize:16,marginBottom:12,color:'#445'},error:{color:'#b42318'}});
