FROM node:21-alpine as base
WORKDIR /app
COPY package*.json ./  
RUN npm ci  
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
