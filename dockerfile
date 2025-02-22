# ================
# STAGE 1: BUILD FRONTEND (Client)
# ================
FROM node:16-alpine AS build-client

WORKDIR /app

# Najprv skopírujeme package.json a package-lock.json z priečinka Client
COPY Client/package*.json ./Client/

# Nainštalujeme frontend závislosti
RUN cd Client && npm install

# Skopírujeme celý obsah priečinka Client
COPY Client/ ./Client

# Spustíme build
RUN cd Client && npm run build


# ================
# STAGE 2: BUILD SERVER
# ================
FROM node:16-alpine AS production

WORKDIR /app

# Skopírujeme package.json + lock zo Server/ a nainštalujeme len production dependencies
COPY Server/package*.json ./Server/
RUN cd Server && npm install --production

# Skopírujeme zvyšok serverového kódu
COPY Server/ ./Server

# Skopírujeme vybuildený frontend z prvého stage do priečinka "Server/client/dist"
COPY --from=build-client /app/Client/dist ./Server/client/dist

# Exponujeme port 5000 (tvoj server beží na 5000)
EXPOSE 5000

# Spustíme server (v package.json máš "start": "nodemon index.js", ale v produkcii je lepšie spustiť "node index.js")
CMD ["node", "Server/index.js"]
