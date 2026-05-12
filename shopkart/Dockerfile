FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --include=dev
COPY . .
RUN rm -rf node_modules && npm install --include=dev
ARG VITE_API_URL=http://13.61.52.37:8080
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]