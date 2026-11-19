import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const desktopUrl = Platform.OS === 'web' && __DEV__ ? 'http://localhost:3000' : '';
export const API_URL = (process.env.EXPO_PUBLIC_API_URL?.trim() || desktopUrl).replace(/\/+$/, '');

export async function api(path, { method = 'GET', body, auth = true } = {}) {
  if (!API_URL) {
    throw new Error('Endereço da API ausente. Configure EXPO_PUBLIC_API_URL para esta versão.');
  }

  const token = auth ? await AsyncStorage.getItem('vs_token') : null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(data?.erro || `Erro HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }
    if (data === null) throw new Error('A API retornou uma resposta inválida.');
    return data;
  } catch (error) {
    if (controller.signal.aborted) throw new Error('A API demorou para responder. Tente novamente.');
    if (error instanceof TypeError) {
      throw new Error('Sem conexão com a API. Confira o endereço do servidor e a rede.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
