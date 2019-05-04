#!/bin/bash
# author: daskyrk
# desc: init blog project environment

# 下面部分直接放到start script中在机器启动时执行
# mkdir ~/.ssh
# echo "生成本机ssh-key";
# ssh-keygen -t rsa -N "" -P ''  -C 'daskyrk@gmail.com' -f ~/.ssh/id_rsa

# echo "保存终端的ssh-key"
# echo ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCo2FMfZXLKcfa98JvOKrThX/p0MvLf2sEbCfOwoIn1BkkGCyaMJvS8KW0dSQGru1l1Ampleqlxlaa+f3JOiXDrlQIC2r9j7UyQVya3h8bJQQzZn+1KxuIxSrfsajCMxZbA68hkoDRL36IbfwNLw/5OnNe8VERfXAXizkQPH9nxlWhR22JXja35/OayHxsomVwxWO904S3g5fgXQF0kiGwTtsApXQt9wIO29gvAySZ8cTa0asbFY5chqQ715NAHURc8tQb1m5Mqa6oRH1pSFG8QjaWlAoyZJSh64ocduU1DP5Uj8f5PSCAefcIpwzGsbTo3fQ/B8VLDTnTSK5DHQtTh daskyrk@gmail.com >> ~/.ssh/authorized_keys

# echo "开始安装nginx";
# yum -y install nginx

# echo "先页面上配置一下防火墙规则";
# echo "开启80端口";
# firewall-cmd --zone=public --add-port=80/tcp --permanent

# echo "启动 nginx";
# sudo nginx
# echo "设置系统启动时自动启动nginx"
# sudo systemctl enable nginx

# echo "安装net工具包";
# yum -y install net-tools

# echo "安装git"
# yum -y install git
# cd ~
# echo "创建workspace目录"
# mkdir workspace
# cd workspace
# echo "安装nvm"
# git clone https://github.com/creationix/nvm.git
# source ~/workspace/nvm/nvm.sh
# echo "安装latest版本node"
# nvm install --lts
# echo "node 版本："
# node -v
# echo "npm 版本："
# npm -v
# echo "安装最新版npm"
# npm i npm -g

# echo "添加nvm到环境变量"
# echo '
# # nvm
# export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
# source ~/workspace/nvm/nvm.sh
# ' > ~/.bashrc
# source ~/.bashrc

# echo "配置MongoDB的yum源"
# echo '[mongodb-org-3.6]
# name=MongoDB Repository
# baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
# gpgcheck=1
# enabled=1
# gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
# ' > /etc/yum.repos.d/mongodb-org-3.6.repo

# echo "安装mongodb"
# yum -y install mongodb-org

# echo "启动mongodb"
# systemctl start mongod.service
# echo "设置系统启动时自动启动mongodb"
# systemctl enable mongod.service

echo "下载项目"
cd ~/workspace
echo "请复制下面的ssh key，添加到 https://github.com/settings/ssh/new"
cat ~/.ssh/id_rsa.pub
read -s -n1 -p "Press any key to continue ..."
# while :
# do
#   read -p "输入y继续:" ans
#   if [ "$ans" = "y" ]
#   then
#     break;
#   else
#     echo "还没准备好？重试一下"
#   fi
# done

echo "clone 项目"
git clone git@github.com:daskyrk/blog.git
git checkout feature/no-vuetify
cd blog/client
echo "安装前端依赖"
npm i
# echo "执行构建"
# npm run build
# npm run start

echo "安装后端依赖"
cd ../server
npm i
# 添加my-config.js
# npm run start

echo "恢复数据"
cd ../db
bash init.sh
