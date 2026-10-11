# Use Node.js 22 on Alpine Linux
FROM node:22-alpine

# Set the application working directory
WORKDIR /app

# Configure the production environment
ENV NODE_ENV=production

# Copy the application source with non-root ownership
COPY --chown=1000:1000 server.js ./server.js

# Run as a non-root user with a numeric UID for Kubernetes compatibility
USER 1000:1000

# Document the application port
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]
