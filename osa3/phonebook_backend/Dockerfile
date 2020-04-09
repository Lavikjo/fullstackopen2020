FROM node:13.12.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3001
CMD [ "node", "index.js" ]