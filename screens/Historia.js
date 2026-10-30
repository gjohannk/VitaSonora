import React from 'react';
import {Text,StyleSheet} from 'react-native';
import {Page,Heading,Card,Button} from '../components/UI';
export default function Historia({route,navigation}){const {title='Uma história com música',body=''}=route.params||{};return <Page><Heading>{title}</Heading><Card title="Sobre este tema">{body}</Card><Text style={s.note}>Esta seção apresenta os temas do protótipo. As publicações e os comentários reais serão conectados ao banco de dados em entregas futuras.</Text><Button label="Voltar à comunidade" onPress={()=>navigation.goBack()}/></Page>}
const s=StyleSheet.create({note:{fontSize:16,color:'#516452',lineHeight:24,marginVertical:15}});
