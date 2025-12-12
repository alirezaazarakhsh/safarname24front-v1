# مرحله ساخت (builder) - تصویر کامل برای build
FROM node:20.11.0-alpine AS builder

WORKDIR /app

# فقط فایل‌های لازم برای install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# کپی کد و build
COPY . .
RUN npm run build

# مرحله اجرا (runtime) - تصویر کوچک و امن
FROM node:20.11.0-alpine AS runner

WORKDIR /app

# کاربر non-root بساز (امنیت بالا)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# فقط فایل‌های لازم از standalone کپی کن
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# مالکیت رو به کاربر non-root بده
RUN chown -R nextjs:nodejs /app

# سوئیچ به کاربر non-root
USER nextjs

# پورت
EXPOSE 3000

# محیط تولید
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# شروع اپ
CMD ["node", "server.js"]