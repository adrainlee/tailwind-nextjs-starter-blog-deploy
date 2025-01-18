# GitHub Secrets 配置指南

为了使 CI/CD 工作流正常运行，需要在 GitHub 仓库中配置以下 Secrets：

## 必要的 Secrets

1. `SERVER_HOST`

   - 类型：String
   - 说明：生产服务器的 IP 地址或域名
   - 示例：`123.456.789.0` 或 `your-domain.com`

2. `SERVER_USERNAME`

   - 类型：String
   - 说明：用于 SSH 连接的用户名
   - 示例：`ubuntu` 或 `deploy`

3. `SERVER_SSH_KEY`
   - 类型：SSH Private Key
   - 说明：用于 SSH 连接的私钥
   - 注意：确保对应的公钥已添加到服务器的 authorized_keys 中

## 配置步骤

1. 生成 SSH 密钥对（如果还没有）

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. 在 GitHub 仓库中添加 Secrets

   - 进入仓库设置
   - 点击 "Secrets and variables" -> "Actions"
   - 点击 "New repository secret"
   - 添加上述三个 Secrets

3. 在服务器上配置
   - 将 SSH 公钥添加到服务器的 `~/.ssh/authorized_keys`
   ```bash
   echo "your-public-key" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

## 验证配置

1. 确认 GitHub Actions 权限

   - 进入仓库设置
   - 点击 "Actions" -> "General"
   - 确保 "Allow all actions and reusable workflows" 已启用

2. 测试配置
   - 推送一个小改动到 main 分支
   - 在 Actions 标签页查看工作流运行状态
   - 检查部署日志确认无错误

## 故障排除

如果遇到部署问题，请检查：

1. Secrets 是否正确配置
2. SSH 密钥格式是否正确
3. 服务器防火墙是否允许 SSH 连接
4. GitHub Actions 权限是否正确设置

## 安全建议

1. 使用专门的部署用户
2. 限制部署用户的权限
3. 定期轮换 SSH 密钥
4. 监控部署日志中的异常
