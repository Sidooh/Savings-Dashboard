# build stage
FROM node:lts-alpine as build

ARG VITE_ACCOUNTS_API_URL
ARG VITE_SAVINGS_API_URL

ARG VITE_ACCOUNTS_DASHBOARD_URL
ARG VITE_MERCHANTS_DASHBOARD_URL
ARG VITE_PRODUCTS_DASHBOARD_URL
ARG VITE_PAYMENTS_DASHBOARD_URL
ARG VITE_NOTIFY_DASHBOARD_URL
ARG VITE_USSD_DASHBOARD_URL

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml vite.config.ts tsconfig.json tsconfig.node.json index.html tailwind.config.ts postcss.config.js ./
COPY .yarn/releases/ ./.yarn/releases/
COPY src/ ./src/
COPY public/ ./public/

RUN yarn
RUN yarn build



# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build /app/dist /app
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

