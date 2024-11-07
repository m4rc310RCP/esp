FROM node:22

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm i

# Copia todos os arquivos para o diretório /app
COPY . .

# Executa o build, garantindo que o `overview.html` seja incluído no dist
RUN pnpm run build

# Expõe a porta 3000
EXPOSE 3000

# Comando de inicialização
CMD ["pnpm", "start"]