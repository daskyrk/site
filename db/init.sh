#!/bin/bash
# author: daskyrk
# desc: init blog project database data

dbname="blog"

if [ ! -d "./$dbname" ]; then
	if [ ! -f "./$dbname.tar.gz" ]; then
		read -p "数据库备份文件不存在，是否进行备份？【y/n】" backup
		case $backup in
		Y | y)
			echo "开始备份..."
			mongodump -h 127.0.0.1 -d $dbname -o ./
			echo "开始压缩..."
			tar -czvf $dbname.tar.gz ./
			;;
		*)
			echo "未备份，退出"
			;;
		esac
		# 没有备份文件就直接退出
		exit 1
	else
		echo "解压备份文件..."
		tar -xzvf $dbname.tar.gz
	fi
fi

read -p "请输入恢复后的数据库名（默认为blog）：" name
if [ -z "${dbname}" ]; then
	name=$dbname
fi
echo "开始恢复数据库：$dbname..."
mongorestore -h 127.0.0.1 -d $name ./$dbname
