FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "i"]
CMD ["npm", "run", "dev"]
