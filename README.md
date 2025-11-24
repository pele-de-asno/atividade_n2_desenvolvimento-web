# MongoDB Dashboard — Node.js + MongoDB + Docker

Um dashboard moderno, seguro e estiloso para visualizar, editar e manipular documentos diretamente do MongoDB.
Criado com **Node.js**, **Express**, **EJS**, **Docker** e um tema **dark violeta neon 🔮**.

---

## Recursos principais

*    Login com autenticação direta no MongoDB
* 🟣 Sessão persistente com renovação automática
* 📊 CRUD completo (Create, Read, Update, Delete)
* ⏳ Ordenação automática por `recvTime` (decrescente)
*    Contagem total de documentos da collection
* 🖥 Interface moderna com tema dark + violeta neon
*   Totalmente dockerizado
*   Suporte completo ao FIWARE STH‑Comet / MongoDB Legacy

---

##  Arquitetura do Projeto

```
projeto_api/
│
├── routes/
│     └── items.js           # Rotas CRUD
│
├── models/
│     └── Item.js            # Model FIWARE via Mongoose
│
├── views/                   # Templates EJS
│     ├── dashboard.ejs
│     ├── edit.ejs
│     └── login.ejs
│
├── public/
│     └── style.css          # Estilos globais
│
├── server.js                # Servidor Express + Sessão
├── Dockerfile               # Build do container
├── .dockerignore            # Arquivos ignorados no Docker
└── package.json
```

---

## 🛠 Tecnologias Utilizadas

| Tecnologia          | Propósito                     |
| ------------------- | ----------------------------- |
| **Node.js**         | Backend do sistema            |
| **Express**         | Servidor HTTP e rotas         |
| **MongoDB**         | Armazenamento FIWARE          |
| **Mongoose**        | ODM para manipular documentos |
| **Docker**          | Deploy conteinerizado         |
| **EJS**             | View Engine                   |
| **Express‑Session** | Controle de Sessão            |

---

##  Como Rodar com Docker

###  Build da imagem

```
docker build -t fiware-dashboard .
```

### ▶️ Rodar o container

```
docker run -p 3000:3000 fiware-dashboard
```

Acesse em:
👉 [http://localhost:3000](http://localhost:3000)

---

##  Como Rodar Sem Docker

```
npm install
node server.js
```

Acesse:
👉 [http://localhost:3000](http://localhost:3000)

---

##  Estrutura das Views

### 📊 Dashboard

* Lista todos os documentos existentes na collection
* Ordena automaticamente por `recvTime` (decrescente)
* Exibe total de documentos
* Botões de edição e remoção

###  Formulário de Criação

* Envia: `attrName`, `attrType`, `attrValue`
* `recvTime` é gerado automaticamente no servidor

###  Login

* Autentica diretamente no MongoDB via usuário + senha
* Sessão renovada automaticamente enquanto o usuário navega

---

##  API / Fluxo de Dados

O servidor ao autenticar monta a URI:

```
mongodb://user:pass@IP:27017/sth_smart?authSource=admin
```

E as rotas CRUD usam o model configurado para se conectar à collection FIWARE:

```
sth_/_urn:ngsi-ld:Lamp:001_Lamp
```

---

##  Desenvolvimento

### Criar nova funcionalidade

```
git checkout -b feature/minha-feature
```

### Salvar mudanças

```
git add .
git commit -m "feat: minha feature"
```

### Enviar para o GitHub

```
git push origin feature/minha-feature
```
