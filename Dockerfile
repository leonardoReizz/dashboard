FROM node:20-alpine

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY package.json .

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn", "preview"]