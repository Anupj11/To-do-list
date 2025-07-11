FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/* 
COPY . /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;"]
EXPOSE 8000
