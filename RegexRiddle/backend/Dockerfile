FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy prisma schema and source code
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

# Generate prisma client and build
RUN pnpm prisma generate
RUN pnpm build

# Production stage
FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Create a start script to run migrations and start
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'pnpm prisma db push' >> /app/start.sh && \
    echo 'pnpm prisma db seed' >> /app/start.sh && \
    echo 'node dist/server.js' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 3001

CMD ["/app/start.sh"]
