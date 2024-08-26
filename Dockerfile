# Etapa 1: Construcción de la aplicación
FROM node:20.14.0 as build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install -g @angular/cli@17.3.8 && npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación Angular para producción
RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist/challenge-tech-forb-client /usr/share/nginx/html

# Exponer el puerto en el que Nginx escuchará
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]