FROM nginx
COPY ./dist /usr/share/nginx/html
EXPOSE 80
ADD ./ngnix.conf  /etc/nginx/conf.d/
# 在前端一直运行该容器
# docker run --name mynginx1 -p 80:80 nginx1
CMD ["nginx", "-g", "daemon off;"]