# SSO

> Este é um SSO (Sistema de Autenticação Única) que permite que os usuários acessem todos os meus sites utilizando apenas uma conta.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações estão no [Projeto](https://github.com/users/maycon-jesus/projects/7/views/5).

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você instalou a versão mais recente do [Node.js](https://nodejs.org/en/)
* Você tem um banco de dados MySQL configurado e com um schema criado para este projeto

## 🚀 Instalando sso-api

Antes de seguir para a instalação de fato é preciso definir a variáveis de ambiente. Para isso crie um arquivo chamado `.env` e coloque o seguinte conteúdo:

```
DATABASE_URL=mysql://<username>:<password>@<host>:<port>/<schema>

# Coloque aqui algum texto aleatorio para ser a chave que vai gerar os tokens JWT
JWT_SECRET=

# Essa será a porta da api, mude conforme sua necessidade
PORT=8080
```

Agora com o `.env` ja configurado, basta executar estes comandos para instalar

```bash
# Instalando as dependências
npm install

# Executar as migrations do banco de dados
npm run prisma:migrate-deploy
```

## ☕ Usando sso-api

Para usar o sso-api, execute o seguinte comando:

```bash
npm run start
```
    