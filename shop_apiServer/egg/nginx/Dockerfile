FROM node:16.17.0

COPY . /app
WORKDIR /app
RUN npm install

EXPOSE 8080
CMD npm start

# 参数FROM表示依赖的镜像，
# COPY表示将宿主机的文件拷贝到容器中，
# WORKDIR表示工作目录，
# RUN表示编译打包前运行的命令，
# EXPOSE表示容器暴露的端口，
# CMD表示启动容器时运行的命令。