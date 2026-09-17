FROM node:22
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./

# Vite bakes VITE_* vars into the built JS at build time, not container
# start time — a compose-file `environment:` entry on the frontend
# service would be silently ignored. This must come in as a build arg
# instead. See docker-compose.yml for the value it's given.
ARG VITE_NODE_HOST_APP
ENV VITE_NODE_HOST_APP=$VITE_NODE_HOST_APP
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
