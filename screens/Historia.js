
import React, { useCallback, useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  View,
  Platform
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { Page, Heading, Card, Button } from '../components/UI';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Historia({ route, navigation }) {
  const id = route.params.id;
  const { usuario } = useAuth();

  const [relato, setRelato] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState('');
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    try {
      const [r, c] = await Promise.all([
        api(`/api/relatos/${id}`),
        api(`/api/relatos/${id}/comentarios`)
      ]);

      setRelato(r);
      setComentarios(c);
      setErro('');
    } catch (e) {
      setErro(e.message);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  const podeEditar =
    usuario &&
    relato &&
    (usuario.id === relato.usuario_id ||
      usuario.nivel === 'admin');

  async function excluir() {
    try {
      await api(`/api/relatos/${id}`, {
        method: 'DELETE'
      });

      navigation.navigate('Comunidade');
    } catch (e) {
      setErro(e.message);
    }
  }

  function confirmarExclusao() {
    if (Platform.OS === 'web') {
      const confirmou = window.confirm(
        'Deseja realmente excluir este relato? Esta ação não pode ser desfeita.'
      );

      if (confirmou) {
        excluir();
      }

      return;
    }

    Alert.alert(
      'Excluir relato?',
      'Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: excluir
        }
      ]
    );
  }

  async function comentar() {
    if (!texto.trim()) return;

    try {
      await api(`/api/relatos/${id}/comentarios`, {
        method: 'POST',
        body: { texto }
      });

      setTexto('');
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  async function excluirComentario(comentarioId) {
    try {
      await api(`/api/comentarios/${comentarioId}`, {
        method: 'DELETE'
      });

      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <Page>
      {!!erro && <Text style={s.erro}>{erro}</Text>}

      {!relato ? (
        erro ? null : <ActivityIndicator />
      ) : (
        <>
          <Heading>{relato.titulo}</Heading>

          <Text>
            {relato.autor_nome} · {relato.tema}
          </Text>

          <Card title="História">
            {relato.conteudo}
          </Card>

          {podeEditar && (
            <>
              <Button
                label="Editar relato"
                onPress={() =>
                  navigation.navigate('Novo relato', { id })
                }
              />

              <Button
                outline
                label="Excluir relato"
                onPress={confirmarExclusao}
              />
            </>
          )}

          <Heading size={23}>Comentários</Heading>

          {comentarios.map(c => (
            <View key={c.id} style={s.comentario}>
              <Text style={s.autor}>
                {c.autor_nome}
              </Text>

              <Text>{c.texto}</Text>

              {usuario &&
                (usuario.nivel === 'admin' ||
                  usuario.id === c.usuario_id) && (
                  <Button
                    outline
                    label="Apagar comentário"
                    onPress={() => excluirComentario(c.id)}
                  />
                )}
            </View>
          ))}

          {usuario ? (
            <>
              <TextInput
                style={s.input}
                multiline
                placeholder="Escreva um comentário"
                value={texto}
                onChangeText={setTexto}
              />

              <Button
                label="Comentar"
                onPress={comentar}
              />
            </>
          ) : (
            <Button
              label="Entrar para comentar"
              onPress={() => navigation.navigate('Entrar')}
            />
          )}
        </>
      )}
    </Page>
  );
}

const s = StyleSheet.create({
  erro: {
    color: '#b42318'
  },
  comentario: {
    backgroundColor: 'white',
    padding: 13,
    borderRadius: 12,
    marginBottom: 10
  },
  autor: {
    fontWeight: '700',
    color: '#287e35'
  },
  input: {
    borderWidth: 1,
    borderColor: '#83b789',
    borderRadius: 12,
    padding: 14,
    backgroundColor: 'white',
    minHeight: 70,
    textAlignVertical: 'top'
  }
});
