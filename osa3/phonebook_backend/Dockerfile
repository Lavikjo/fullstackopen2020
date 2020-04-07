FROM node:13.12.0-alpine
WORKDIR /app
USER node
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent --prod

COPY . .
EXPOSE 3001
CMD [ "node", "index.js" ]