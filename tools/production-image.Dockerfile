ARG BASE_IMAGE_TAG=latest
FROM linkshop-builder:$BASE_IMAGE_TAG AS builder

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]