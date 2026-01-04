FROM node:25.2.1-alpine3.22
LABEL authors="bex1111"

RUN mkdir -p /ui /backend /data /cache && \
    chmod 550 /data && \
    chmod 550 /cache

ENV STATIC_FOLDER_FOR_WEB='/ui'
ENV FOLDER='/data'
ENV CACHE='/cache'

WORKDIR /backend

COPY backend/dist ./

COPY ui/dist/ /ui/

CMD ["node", "bundle.js"]
