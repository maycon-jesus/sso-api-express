FROM node:lts

ENV PORT="80"
EXPOSE 80

WORKDIR /app

COPY . .

RUN ["npm", "install"]


# ENTRYPOINT ["./entrypoint.sh"]
ENTRYPOINT [ "sh", "./entrypoint.sh" ]