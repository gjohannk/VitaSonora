import React,{useState} from 'react';
import {TextInput,Alert,Text,StyleSheet} from 'react-native';
import {Page,Heading,Button} from '../components/UI';
import {api} from '../services/api';
export default function NovoRelato({navigation}){
 const [autor,setAutor]=useState(''),[titulo,setTitulo]=useState(''),[conteudo,setConteudo]=useState(''),[tema,setTema]=useState('Bem-estar'),[salvando,setSalvando]=useState(false),[erro,setErro]=useState('');
 async function salvar(){if(!autor.trim()||!titulo.trim()||!conteudo.trim()){setErro('Preencha autor, título e relato.');return}setSalvando(true);try{await api('/api/relatos',{method:'POST',body:{autor_nome:autor,titulo,conteudo,tema}});navigation.navigate('Comunidade');}catch(e){setErro(e.message)}finally{setSalvando(false)}}
 return <Page><Heading>Novo relato</Heading><Text>Na Entrega 2, os relatos são públicos e não exigem login.</Text><TextInput style={s.input} placeholder="Seu nome" value={autor} onChangeText={setAutor}/><TextInput style={s.input} placeholder="Título" value={titulo} onChangeText={setTitulo}/><TextInput style={s.input} placeholder="Tema (bem-estar, infância...)" value={tema} onChangeText={setTema}/><TextInput style={[s.input,s.area]} multiline placeholder="Como a música marcou sua vida?" value={conteudo} onChangeText={setConteudo}/>{!!erro&&<Text style={s.error}>{erro}</Text>}<Button label={salvando?'Publicando...':'Publicar relato'} onPress={salvar}/></Page>
}
const s=StyleSheet.create({input:{borderWidth:1,borderColor:'#83b789',borderRadius:12,padding:12,marginVertical:9,backgroundColor:'#fff',fontSize:16},area:{minHeight:145,textAlignVertical:'top'},error:{color:'#b42318'}});
