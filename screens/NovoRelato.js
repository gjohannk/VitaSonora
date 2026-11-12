import React,{useEffect,useState} from 'react';
import {TextInput,Text,StyleSheet,ActivityIndicator} from 'react-native';
import {Page,Heading,Button} from '../components/UI';
import {api} from '../services/api';
import {useAuth} from '../context/AuthContext';
export default function NovoRelato({navigation,route}){
 const id=route.params?.id;const {usuario}=useAuth();const [titulo,setTitulo]=useState(''),[conteudo,setConteudo]=useState(''),[tema,setTema]=useState('Bem-estar'),[erro,setErro]=useState(''),[busy,setBusy]=useState(false);
 useEffect(()=>{if(id)api(`/api/relatos/${id}`).then(r=>{setTitulo(r.titulo);setConteudo(r.conteudo);setTema(r.tema)}).catch(e=>setErro(e.message));},[id]);
 async function salvar(){if(!usuario){navigation.navigate('Entrar');return}setBusy(true);setErro('');try{await api(id?`/api/relatos/${id}`:'/api/relatos',{method:id?'PUT':'POST',body:{titulo,conteudo,tema}});navigation.navigate('Comunidade')}catch(e){setErro(e.message)}finally{setBusy(false)}}
 return <Page><Heading>{id?'Editar relato':'Novo relato'}</Heading>{!usuario&&<Text>Entre na sua conta para publicar.</Text>}<TextInput style={s.input} placeholder="Título" value={titulo} onChangeText={setTitulo}/><TextInput style={s.input} placeholder="Tema" value={tema} onChangeText={setTema}/><TextInput style={[s.input,{minHeight:155,textAlignVertical:'top'}]} multiline placeholder="Conte sua história com a música" value={conteudo} onChangeText={setConteudo}/>{!!erro&&<Text style={{color:'#b42318'}}>{erro}</Text>}<Button label={busy?'Salvando...':id?'Salvar alterações':'Publicar relato'} onPress={busy?()=>{}:salvar}/></Page>
}
const s=StyleSheet.create({input:{padding:13,backgroundColor:'#fff',borderColor:'#83b789',borderWidth:1,borderRadius:12,marginVertical:10,fontSize:16}});
