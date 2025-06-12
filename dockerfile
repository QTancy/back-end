# ----- Tahap Produksi (Menggunakan image yang lebih kecil untuk runtime) -----
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY . .

CMD ["npm", "start"]
