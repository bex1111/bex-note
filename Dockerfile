FROM node:25.1.0-alpine3.22
LABEL authors="bex1111"

RUN mkdir -p /ui /backend /data && chmod 550 /data

ENV STATIC_FOLDER_FOR_WEB='/ui'
ENV FOLDER='/data'

WORKDIR /backend

COPY backend/dist ./

COPY ui/dist/ /ui/

CMD ["node", "bundle.js"]
