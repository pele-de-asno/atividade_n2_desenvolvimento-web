# ======================================
# 1 — Base com Node + npm
# ======================================
FROM node:22-alpine

# ======================================
# 2 — Dependências nativas (necessário p/ Node-gyp)
# ======================================
RUN apk add --no-cache python3 make g++

# ======================================
# 3 — Diretório de trabalho do container
# ======================================
WORKDIR /app

# ======================================
# 4 — Copia APENAS package.json e package-lock.json
#    (de dentro do diretório projeto_api)
# ======================================
COPY projeto_api/package*.json ./

# ======================================
# 5 — Instala dependências do Node
# ======================================
RUN npm install

# ======================================
# 6 — Copia TODO o conteúdo da pasta projeto_api
# ======================================
COPY projeto_api/ ./

# ======================================
# 7 — Configura ambiente
# ======================================
ENV NODE_ENV=production

# ======================================
# 8 — Expõe a porta 3000 (Express)
# ======================================
EXPOSE 3000

# ======================================
# 9 — Inicia o servidor
# ======================================
CMD ["node", "server.js"]
