FROM node:25.0.0-alpine3.22
LABEL authors="bex1111"

RUN mkdir -p /ui /backend /data && chmod 775 /data

ENV STATIC_FOLDER_FOR_WEB='/ui'
ENV FOLDER='/data'
ENV USERNAME='test'
ENV PASSWORD='test'

WORKDIR /backend

COPY backend/dist ./

COPY ui/dist/ /ui/

EXPOSE 3000

CMD ["node", "bundle.js"]
