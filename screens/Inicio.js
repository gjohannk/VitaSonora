import React from 'react';
import { Text,View,StyleSheet } from 'react-native';
import { Page,Header,Heading,Button } from '../components/UI';
import { colors } from '../theme/colors';
export default function Inicio({navigation}){return <Page><Header navigation={navigation}/><View style={s.hero}><Text style={s.notes}>♫ ♬</Text><Heading size={34}>Como a música transforma vidas</Heading><Text style={s.subtitle}>Um espaço para compartilhar histórias, sentimentos e momentos especiais em que a música fez a diferença.</Text><Button label="Faça login e compartilhe sua história" onPress={()=>navigation.navigate('Entrar')}/></View><View style={s.bottom}><Button label="Conheça a comunidade" outline onPress={()=>navigation.navigate('Comunidade')}/><Button label="Sobre o projeto" outline onPress={()=>navigation.navigate('Sobre')}/><Button label="Contato" outline onPress={()=>navigation.navigate('Contato')}/></View></Page>}
const s=StyleSheet.create({hero:{alignItems:'center',paddingTop:35,paddingBottom:35},notes:{fontSize:65,color:colors.medium,marginBottom:22},subtitle:{fontSize:20,lineHeight:29,color:'#484848',textAlign:'center',fontWeight:'600',marginBottom:25},bottom:{marginTop:24}});
