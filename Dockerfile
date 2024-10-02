FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npx prisma generate

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app .

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
