FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# ساخت یوزر غیر root
RUN addgroup -S app && adduser -S app -G app

# تنظیم permission برای public directory
RUN chown -R app:app /app/public

USER app

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["npm", "run", "start"]
