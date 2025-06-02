# syntax=docker.io/docker/dockerfile:1

FROM node:24-alpine AS base
# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY src/package.json src/package-lock.json* ./
RUN npm ci

# Build smart-ui package
FROM base AS smart-ui-builder
WORKDIR /smart-ui/src
COPY smart-ui/src/package.json smart-ui/src/package-lock.json* ./
RUN npm ci
COPY smart-ui/src .
RUN npm run build

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY src/package.json src/package-lock.json* ./
COPY --from=smart-ui-builder /smart-ui/src/dist ./smart-ui/src/dist
COPY --from=deps /app/node_modules ./node_modules
COPY src .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/generated ./generated
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]