# Definimos la base que sera node
FROM node:14

# Se define el directorio donde se colocara todo el codigo dentro del contenedor
WORKDIR /home/app

# Se instalan las dependencias
    # Se copia los package.json
COPY package*.json ./

RUN npm install

# Bundle app
COPY . .

# Expone el puerto 8080
EXPOSE 8080

# Se ejecuta la app
CMD [ "node", "app.js" ]