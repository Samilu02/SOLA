# ---- Base Node ----
FROM node:14 AS base
WORKDIR /app

# ---- Backend ----
FROM base AS backend
WORKDIR /app
COPY Sola-Backend/package*.json ./
RUN npm install
COPY Sola-Backend .
CMD [ "node", "server.js" ]

# ---- Frontend ----
FROM base AS frontend
WORKDIR /app
COPY Sola-Frontend/package*.json ./
RUN npm install
COPY Sola-Frontend .
RUN npm run build

# ---- Release ----
FROM base AS release
COPY --from=backend /app ./
COPY --from=frontend /app/public ./public
EXPOSE 3009
CMD [ "node", "server.js" ]
