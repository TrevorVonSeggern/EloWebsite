FROM node:6.9.2
ADD package.json package.json
RUN npm install
ADD . .
EXPOSE 80
ENV PORT 80
CMD ["node","main.js"]
