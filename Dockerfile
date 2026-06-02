# ──────────────────────────────────────────────
#  SkillHub Backend – Node.js / Express
# ──────────────────────────────────────────────

# ── Stage 1: Install dependencies ──────────────
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# ── Stage 2: Production image ───────────────────
FROM node:20-alpine AS runner

# Security: run as non-root user
RUN addgroup -S skillhub && adduser -S skillhub -G skillhub

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Remove any accidentally copied .env (secrets come from docker-compose / env)
RUN rm -f .env

# Ensure the uploads directory exists with correct permissions
RUN mkdir -p uploads && chown -R skillhub:skillhub /app

USER skillhub

# Expose the application port
EXPOSE 8000

# Health-check – pings the API root every 30 s
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:8000/health || exit 1

# Start the server
CMD ["node", "index.js"]
