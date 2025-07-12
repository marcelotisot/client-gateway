# Etapa 1: Instalar dependencias
FROM node:24.3-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile

# Etapa 2: Construcción
FROM node:24.3-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Etapa 3: Producción
FROM node:24.3-alpine AS runner
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
USER app

# Copiar archivos necesarios
COPY --from=builder /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Exponer el puerto que usa NestJS
EXPOSE 3003

# Arrancar la app en modo producción
CMD ["node", "dist/main.js"]