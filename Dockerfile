FROM cr.idiaoyan.cn/ops/nodejs:16.5.0-86625f25 as builder
WORKDIR application
COPY ./ ./
RUN yum install gcc-c++ -y
RUN yum install -y centos-release-scl
RUN yum install -y devtoolset-9-gcc*
RUN scl enable devtoolset-9 bash
RUN scl enable devtoolset-9 sh
RUN npm i nrm -g;nrm add idiaoyan http://mirrors.idiaoyan.cn/repository/npm-group/;nrm use idiaoyan
RUN npm install --global yarn
RUN yarn install 
RUN yarn run build:test

FROM nginx:1.23.1-alpine as runner
WORKDIR application
COPY --from=builder application/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf


