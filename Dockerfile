# ----- Tahap Build -----
FROM node:20-alpine AS build 


WORKDIR /app


COPY package*.json ./


RUN npm install --production --no-audit --progress=plain

# ----- Tahap Produksi (Menggunakan image yang lebih kecil untuk runtime) -----
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY . .

CMD ["npm", "start"]

