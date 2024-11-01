FROM node:18.20.4-alpine3.20 as stage
RUN corepack enable
RUN pnpm config set registry https://registry.npmmirror.com/

ENV NODE_ENV production
WORKDIR /app
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN pnpm install


FROM node:18.20.4-alpine3.20
RUN corepack enable
RUN pnpm config set registry https://registry.npmmirror.com/

ENV NODE_ENV production
WORKDIR /app
COPY --from=stage /app ./