import React,{useEffect,useState} from 'react';
import {Text,ActivityIndicator} from 'react-native';
import {Page,Heading,Card} from '../components/UI';
import {api} from '../services/api';
export default function Historia({route}){const [relato,setRelato]=useState(null),[erro,setErro]=useState('');useEffect(()=>{api(`/api/relatos/${route.params.id}`).then(setRelato).catch(e=>setErro(e.message));},[route.params.id]);return <Page>{erro?<Text>{erro}</Text>:!relato?<ActivityIndicator/>:<><Heading>{relato.titulo}</Heading><Text>{relato.autor_nome} · {relato.tema}</Text><Card title="Relato">{relato.conteudo}</Card></>}</Page>}
