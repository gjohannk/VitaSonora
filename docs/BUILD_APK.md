# Como gerar o APK final do VitaSonora

Este projeto inclui `eas.json` com um perfil `preview` que produz um **APK** (e não AAB). O APK é gerado pelo serviço Expo EAS e **não** é incluído neste pacote.

## 1. Antes de compilar: decidir onde ficará a API

O app depende de `Node.js/Express + MySQL`, que **não ficam dentro do APK**.

**Opção recomendada para avaliação:** disponibilizar a API em servidor com URL HTTPS acessível pelo Android, e banco MySQL conectado a ela. O computador pessoal com backend local é uma alternativa temporária somente quando o celular está na mesma rede e a configuração Android permite HTTP. Em nenhuma hipótese use `localhost` ou `10.0.2.2` em APK instalado em celular físico.

A variável `EXPO_PUBLIC_API_URL` é **pública**, faz parte do app compilado, e deve ser uma URL da API **sem barra final**, por exemplo `https://api.exemplo.com`. Não coloque usuário/senha do MySQL ou `JWT_SECRET` nesse valor.

## 2. No VS Code — pasta raiz do VitaSonora

```bash
npm install
npx expo-doctor
npm install -g eas-cli
eas login
eas build:configure
```

O `eas build:configure` pode alterar `app.json`/`eas.json` e vincular o projeto à tua conta Expo. Verifique que o perfil `preview` continua com `"android": {"buildType":"apk"}` e `"environment":"preview"`.

## 3. Configurar a URL no EAS (preview)

Configure a variável no ambiente **preview** do Expo (substitua pela URL real):

```bash
eas env:create --environment preview --name EXPO_PUBLIC_API_URL --value https://SUA-API-REAL.example --visibility plaintext
```

Se a versão do CLI pedir formato diferente, use o painel do projeto em expo.dev > Environment variables > preview, ou consulte `eas env --help`. Confira com `eas env:list --environment preview`.

## 4. Build APK

```bash
eas build --platform android --profile preview
```

Na primeira compilação, permita a criação de credenciais Android de assinatura pelo EAS quando solicitado. Quando a compilação **terminar com sucesso**, abra o link exibido, baixe o arquivo `.apk` e instale no Android compatível. O build exige conta Expo, internet e a compilação remota — não foi executado automaticamente aqui.

## 5. Validar o APK

1. Abra o APK no Android **sem Expo Go**.
2. Acesse a Comunidade, cadastre uma conta de teste, faça login, publique um relato e comente.
3. Teste permissão de usuário comum e administrador.
4. Se aparecer **Sem conexão com a API**, o servidor precisa estar disponível ao dispositivo; verifique URL, HTTPS, internet/firewall e execução da API.
5. Salve prints e o link do build da Expo.

## 6. GitHub

Depois de revisar os arquivos, execute na pasta correta do projeto:

```bash
git status
git add README.md app.json eas.json docs/ENTREGA_4_CHECKLIST.md docs/BUILD_APK.md docs/ROTEIRO_APRESENTACAO.md
git diff --cached --name-only
git commit -m "Entrega 4 - documentacao final e configuracao APK"
git push origin main
```

Não adicione `.env`, `node_modules`, senhas nem tokens.

Referência: https://docs.expo.dev/build-reference/apk/
