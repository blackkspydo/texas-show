# Base image for dependencies installation
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN apk add --no-cache libc6-compat && \
    corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm install

# Copy application code and build it
COPY . .
RUN pnpm build

# Final runtime image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Copy SQLite database file (ensure it exists locally)
COPY ./texas-show.db ./texas-show.db

EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
