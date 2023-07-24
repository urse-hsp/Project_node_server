FROM node

WORKDIR /app
COPY . /app
RUN npm install

# 使用 nginx最新版本作为基础镜像
# FROM nginx
# COPY --from=build /app/nginx/nginx.conf /etc/nginx/nginx.conf

# EXPOSE 3333
CMD npm start   



# docker build -f /root/project/Vue/vue_api_server/Dockerfile . -t node_server
# docker run -p 10720:8888  --name node_server -dit node_server
# docker run -p 80:80 -v /root/nginx/nginx.conf:/etc/nginx/nginx.conf  -d nginx:latest


# docker rm $(docker ps -a -q)
# docker image prune -a -f
