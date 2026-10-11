# Use Node.js 22 on Alpine Linux
FROM node:22-alpine

# Set the application directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy application source
COPY --chown=node:node server.js ./server.js

# Run as a non-root user
USER node

# Document the application port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
