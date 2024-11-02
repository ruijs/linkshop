FROM node:22.11.0-alpine3.20 as stage
RUN corepack enable
RUN pnpm config set registry https://registry.npmmirror.com/

WORKDIR /app
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN pnpm install


FROM node:22.11.0-alpine3.20
RUN corepack enable
RUN pnpm config set registry https://registry.npmmirror.com/

WORKDIR /app
COPY --from=stage /app ./