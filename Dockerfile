# ---------- Stage 1: Build Next.js frontend ----------
FROM node:20-alpine AS frontend

RUN apk add --no-cache bash python3 make g++ git

WORKDIR /app

COPY package.json pnpm-lock.yaml next.config.mjs tsconfig.json next-env.d.ts ./

RUN npm install -g pnpm
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else pnpm install; fi

COPY app/ ./app/
COPY components/ ./components/
COPY lib/ ./lib/
COPY hooks/ ./hooks/
COPY data/ ./data/
COPY styles/ ./styles/

RUN mkdir -p public
COPY public/ ./public/

RUN pnpm build

# ---------- Stage 2: Python backend + runtime ----------
FROM python:3.11-slim AS runtime

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates gnupg build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    npm install -g pnpm && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/ ./backend/
COPY backend/requirements.txt ./backend/requirements.txt

RUN python -m pip install --upgrade pip setuptools wheel
RUN pip install --no-cache-dir -r backend/requirements.txt

RUN useradd --create-home appuser || true
USER appuser
WORKDIR /home/appuser/app

# Copy frontend build artifacts
COPY --from=frontend --chown=appuser:appuser /app/.next ./frontend/.next
COPY --from=frontend --chown=appuser:appuser /app/public ./frontend/public
COPY --from=frontend --chown=appuser:appuser /app/package.json ./frontend/package.json
COPY --from=frontend --chown=appuser:appuser /app/node_modules ./frontend/node_modules

# Copy backend source
COPY --chown=appuser:appuser backend/ ./backend/

EXPOSE 3000 5000

WORKDIR /home/appuser/app/backend
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]
