# مرحله ساخت
FROM node:20.11.0-alpine AS builder

WORKDIR /app

# کپی فقط فایل‌های لازم برای install (بهینه‌سازی cache)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# کپی بقیه کد
COPY . .

# build با standalone
RUN npm run build

# مرحله اجرا - کوچک و امن
FROM node:20.11.0-alpine AS runner

WORKDIR /app

# کاربر non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# کپی فایل‌های ضروری از standalone
# مهم: standalone همه چیز رو داخل /app/.next/standalone گذاشته
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# اگر public فولدر نداری، خط بالا رو کامنت کن (ارور نمیده)

# مالکیت به کاربر non-root
RUN chown -R nextjs:nodejs /app

# سوئیچ به کاربر امن
USER nextjs

# محیط تولید
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

# اجرا
CMD ["node", "server.js"]
