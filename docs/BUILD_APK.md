# Gerar o APK localmente

O Gradle compila um APK autônomo no computador. Para demonstração, o APK usa a assinatura de desenvolvimento gerada pelo Android SDK para o usuário local. Essa assinatura é adequada para instalação direta em aparelhos de teste.

## Preparar o Windows

1. Instale JDK 17 e o Android SDK com Android Platform 36, Build Tools 36.0.0, NDK 27.1.12297006 e CMake 3.22.1. Defina `JAVA_HOME` e `ANDROID_HOME` com as pastas instaladas.
2. Na raiz, rode `npm ci`. O Gradle Wrapper baixa suas próprias dependências na primeira compilação. O build utiliza os arquivos da pasta `android` e as bibliotecas instaladas localmente.

## Escolher um endereço para a API

- **Demonstração na mesma rede Wi-Fi**. Inicie a API e use o IPv4 real do computador com a porta da API. Verifique no navegador do telefone se `/api/saude` abre. Se a rede da escola isolar os aparelhos, use uma rede em que eles consigam se comunicar ou hospede a API. Use contas fictícias em HTTP porque senhas e tokens passam pela rede sem criptografia.
- **Acesso pela internet**. Hospede a API com HTTPS e mantenha o MySQL acessível ao servidor Express. Informe a URL HTTPS real ao script. Nesse caso o manifesto desativa HTTP.

O endereço da API fica incorporado ao aplicativo. Uma troca de endereço requer recompilação. Use o endereço-base da API, sem o sufixo `/api` e sem credenciais.

## Compilar e instalar

Na raiz, em PowerShell, execute o comando abaixo e informe o endereço real quando solicitado.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-apk.ps1
```

Em caminhos profundos, o script tenta usar uma letra de unidade livre para evitar o limite de caminhos do Windows e desfaz o vínculo ao sair.

O APK fica em `android/app/build/outputs/apk/release/app-release.apk`. O script exibe o caminho e o SHA-256 do arquivo. Anote também o commit usado, obtido com `git rev-parse HEAD`, e mantenha a árvore limpa ao produzir o APK final.

Transfira o arquivo ao celular. Abra-o no Android, autorize a instalação da fonte usada se o sistema pedir e abra o VitaSonora. Se uma instalação anterior usar outra chave de assinatura, teste em outro aparelho ou remova a anterior depois de preservar os dados locais necessários.

## Validar no aparelho

1. Abra a Comunidade e confira se os relatos carregam.
2. Cadastre uma conta de demonstração, saia, entre novamente e reabra o app para verificar a sessão.
3. Publique um relato, abra os detalhes, comente e edite. No diálogo de exclusão, teste cancelar e depois confirme.
4. Com outra conta comum, confira que as ações aparecem apenas nos próprios relatos e comentários. Com uma conta de administrador, confira a tela Usuários e a moderação.
5. Registre o resultado no checklist junto com o commit e a identificação do APK.

[Ambiente Android no React Native](https://reactnative.dev/docs/0.81/set-up-your-environment)
