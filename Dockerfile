# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json .npmrc ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# ---- Runtime stage (static nginx) ----
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
