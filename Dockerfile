FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# VOLUME ["/app/logs"]

EXPOSE 5000

CMD ["npm", "run", "dev"]