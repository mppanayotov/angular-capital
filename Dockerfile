FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["npm", "start"]
