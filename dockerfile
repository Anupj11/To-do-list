FROM nginx:alpine
copy . /usr/share/nginx/html
EXPOSE 8000