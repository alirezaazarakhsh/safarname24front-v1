# ========================
# Base
# ========================
FROM node:20.18-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ========================
# Dependencies
# ========================
FROM base AS deps
COPY package.json package-lock.json* bun.lock* ./
RUN \
    if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
    elif [ -f bun.lock ]; then npm install -g bun && bun install --frozen-lockfile; \
    else npm install --legacy-peer-deps; \
    fi

# ========================
# Builder
# ========================
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# کپی فایل‌های استاتیک داخل standalone
RUN cp -r .next/static .next/standalone/.next/static 2>/dev/null || true
RUN cp -r public .next/standalone/public 2>/dev/null || true

# ========================
# Runner (فوق‌العاده سبک)
# ========================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS="--max-old-space-size=1536"

# کاربر غیر root برای امنیت بیشتر
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]