FROM node:lts

ENV PORT="80"
EXPOSE 80

WORKDIR /app

COPY . .

RUN ["npm", "install"]


ENTRYPOINT "npm run prisma:migrate-deploy && npm start"