import React,{useCallback,useState} from 'react';
import {Text,ActivityIndicator,StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Page,Heading,Card,Button} from '../components/UI';
import {api} from '../services/api';
import {useAuth} from '../context/AuthContext';
export default function Usuarios(){const {usuario}=useAuth();const [lista,setLista]=useState([]),[erro,setErro]=useState('');const carregar=useCallback(async()=>{try{setLista(await api('/api/usuarios'));setErro('')}catch(e){setErro(e.message)}},[]);useFocusEffect(useCallback(()=>{if(usuario?.nivel==='admin')carregar()},[usuario,carregar]));
 async function alternar(u){try{await api(`/api/usuarios/${u.id}/nivel`,{method:'PATCH',body:{nivel:u.nivel==='admin'?'usuario':'admin'}});carregar()}catch(e){setErro(e.message)}}
 return <Page><Heading>Gerenciar usuários</Heading>{usuario?.nivel!=='admin'?<Text>Somente administradores.</Text>:<>{!!erro&&<Text style={s.erro}>{erro}</Text>}{lista.map(u=><React.Fragment key={u.id}><Card title={`${u.nome} (@${u.usuario})`}>{`${u.email} · ${u.nivel}`}</Card>{u.id!==usuario.id&&<Button outline label={u.nivel==='admin'?'Tornar usuário comum':'Tornar administrador'} onPress={()=>alternar(u)}/>}</React.Fragment>)}</>}</Page>}
const s=StyleSheet.create({erro:{color:'#b42318'}});
