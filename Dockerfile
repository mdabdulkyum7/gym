
# Step 1: Use official Node.js image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy rest of the project files
COPY . .

# Step 6: Build TypeScript files
RUN npm run build

# Step 7: Expose port (change if your app uses a different port)
EXPOSE 5000

# Step 8: Command to run the app
CMD ["node", "dist/server.js"]
