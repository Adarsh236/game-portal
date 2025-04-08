# Stage 1: Builder
# Use an official Node.js 18 Alpine image
FROM node:18-alpine AS builder

# Set the working directory to /app
WORKDIR /repo

# Copy the root package files and config files for npm workspaces and other configurations
COPY package*.json turbo.json .prettierrc README.md ./
# Copy Husky configuration
COPY .husky/ .husky/
# Copy workspaces folders: packages
COPY apps/ apps/
COPY packages/ packages/

# Install all dependencies (including workspaces) in the monorepo
RUN npm install --legacy-peer-deps

# Change to the Next.js application workspace
WORKDIR /repo/apps/casino-a

# Change to the Next.js application workspace
# WORKDIR /apps/casino-b

# Build the Next.js app for production
RUN npm run build

# Stage 2: Runner
# Use a smaller Node.js image for production
FROM node:18-alpine AS runner

# Set working directory to /app
WORKDIR /repo

# Copy the built Next.js application from the builder stage
# We copy .next folder, public folder, package.json, and next.config.js for the app.
COPY --from=builder /repo/apps/casino-a/next.config.js apps/casino-a/app/next.config.js
COPY --from=builder /repo/apps/casino-a/public apps/casino-a/public
COPY --from=builder /repo/apps/casino-a/.next apps/casino-a/.next
COPY --from=builder /repo/apps/casino-a/package.json apps/casino-a/package.json

# Set the working directory to the Next.js app workspace
WORKDIR /repo/apps/casino-a

# Expose port 3000 which Next.js uses
EXPOSE 3000

# Set NODE_ENV to production
# ENV NODE_ENV=production

# Start the Next.js server using the start script defined in the app's package.json
CMD ["npm", "run", "start"]
