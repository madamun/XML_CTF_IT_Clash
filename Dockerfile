
FROM node:20-bullseye AS frontend-builder



WORKDIR /app
COPY frontend-app/package.json ./frontend-app/package.json
COPY frontend-app/pnpm-lock.yaml ./frontend-app/pnpm-lock.yaml
RUN npm install -g pnpm


WORKDIR /app/frontend-app 
RUN pnpm install
COPY frontend-app/ ./
RUN pnpm build


FROM node:20-bullseye

RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libxml2-dev \
    pkg-config \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend-api
COPY backend-api/ .


WORKDIR /app
RUN npm install -g pnpm

WORKDIR /app/backend-api
RUN pnpm install
COPY backend-api/ .


WORKDIR /app
COPY --from=frontend-builder /app/frontend-app/dist ./backend-api/frontend_dist
# RUN echo '!tc68_F1ag{encryption_so_cha0tic_but_i_love_it}' > flag.txt
RUN echo 'flag: !tc68_F1ag{R3v34lXXE_h3lp____}' > flag.txt
RUN chmod 777 flag.txt
CMD ["node", "backend-api/server.js"]