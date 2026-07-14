FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 1. CLIENT-SIDE FIREBASE KEYS (Yeh main reason hai crash ka)
ENV NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyDummyKeyHere1234567890"
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="picato-dummy.firebaseapp.com"
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID="picato-dummy"
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="picato-dummy.appspot.com"
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
ENV NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:dummyappid123"

# 2. SERVER-SIDE/ADMIN FIREBASE KEYS
ENV FIREBASE_CLIENT_EMAIL="dummy@picato-dummy.iam.gserviceaccount.com"
ENV FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7\n-----END PRIVATE KEY-----\n"

# 3. OTHER CONFIGS
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"] 
