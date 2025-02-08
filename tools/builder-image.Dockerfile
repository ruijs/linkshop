FROM node:22.13.1-alpine3.21 AS stage
RUN npm install --global corepack@latest
RUN corepack use pnpm@latest-10
# RUN corepack enable
# RUN pnpm config set registry https://registry.npmmirror.com/

WORKDIR /app
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN pnpm install


FROM node:22.13.1-alpine3.21
RUN npm install --global corepack@latest
RUN corepack use pnpm@latest-10
# RUN corepack enable
# RUN pnpm config set registry https://registry.npmmirror.com/

WORKDIR /app
COPY --from=stage /app ./