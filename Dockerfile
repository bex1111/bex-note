FROM node:24.10.0-alpine3.22
LABEL authors="bex1111"

# Create directories
RUN mkdir -p /ui /data /backend

# Set environment variables
ENV STATIC_FOLDER_FOR_WEB='/ui'
ENV FOLDER='/data'
ENV USERNAME='test'
ENV PASSWORD='test'
ENV NODE_ENV='production'

# Set working directory
WORKDIR /backend


# Copy backend source code
COPY backend/dist ./

# Copy UI build (assuming you have a built Vue.js app)
COPY ui/dist/ /ui/

# Expose the port your app runs on
EXPOSE 3000

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Start the application
CMD ["node", "bundle.js"]
