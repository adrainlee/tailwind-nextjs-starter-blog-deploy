# CI/CD 自动化部署配置指南

本文档介绍如何配置博客的自动化部署系统。

## 配置步骤

### 1. 配置 GitHub Secrets

在 GitHub 仓库的 Settings -> Secrets and variables -> Actions 中选择 "Secrets" 选项（不是 Variables），添加以下密钥：

> 注意：这些信息属于敏感数据，必须添加在 Secrets 而不是 Variables 中以确保安全性。

- `SERVER_HOST`: 生产服务器的 IP 地址或域名
- `SERVER_USERNAME`: SSH 登录用户名
- `SERVER_SSH_KEY`: SSH 私钥内容

### 2. 生成 SSH 密钥

```bash
# 在本地生成 SSH 密钥对
ssh-keygen -t rsa -b 4096 -C "your-email@example.com" -f deploy_key

# 将公钥 (deploy_key.pub) 添加到服务器的 ~/.ssh/authorized_keys
# 将私钥 (deploy_key) 内容添加到 GitHub Secrets 的 SERVER_SSH_KEY
```

### 3. 权限配置

确保服务器上的部署目录具有正确的权限：

```bash
sudo chown -R www-data:www-data /var/www/nextjs-blog
```

## 工作流程

1. 当你推送新的博客文章到 `data/blog` 目录时，GitHub Actions 会自动触发部署流程
2. 系统会自动构建项目并部署到生产服务器
3. PM2 会重启应用以使更改生效

## 注意事项

- 确保服务器上已安装 Node.js、Yarn 和 PM2
- 确保 GitHub Actions 配置的 Node.js 版本与服务器版本匹配
- 建议在推送前在本地测试文章格式是否正确
