# CI/CD 指南

本项目使用 GitHub Actions 实现持续集成和持续部署。下面是详细的工作流程说明。

## 持续集成 (CI)

当创建 Pull Request 或推送到 main 分支时，会触发代码质量检查工作流（`.github/workflows/ci.yml`）：

1. **类型检查**

   - 使用 TypeScript 进行静态类型检查
   - 确保代码类型安全

2. **代码质量检查**

   - ESLint 检查代码质量
   - Prettier 确保代码格式统一
   - 运行 `yarn lint` 和 `yarn prettier`

3. **安全检查**

   - 对依赖包进行安全审计
   - 使用 `yarn npm audit`

4. **构建测试**
   - 确保项目可以成功构建
   - 使用 `yarn build`

## 持续部署 (CD)

当代码推送到 main 分支时，如果修改了特定目录（`data/blog/**`, `app/**`, `components/**`, `layouts/**`），会触发部署工作流（`.github/workflows/deploy.yml`）：

1. **构建阶段**

   - 检出代码
   - 安装依赖
   - 构建项目
   - 验证构建结果

2. **部署阶段**

   - 通过 SSH 连接到生产服务器
   - 自动备份当前版本
   - 部署新版本
   - 重启应用服务

3. **回滚机制**

   - 如果部署失败，自动回滚到上一个稳定版本
   - 保留最近3个备份版本

4. **部署通知**
   - 在 GitHub 上通过 issue comment 通知部署状态
   - 成功/失败状态明确显示

## 环境变量配置

需要在 GitHub 仓库的 Secrets 中配置以下变量：

- `SERVER_HOST`: 生产服务器地址
- `SERVER_USERNAME`: SSH 用户名
- `SERVER_SSH_KEY`: SSH 私钥

## 本地开发流程

1. 创建功能分支

   ```bash
   git checkout -b feature/your-feature
   ```

2. 本地开发并测试

   ```bash
   yarn dev
   ```

3. 提交代码前运行检查

   ```bash
   yarn lint
   yarn prettier --write .
   yarn build
   ```

4. 创建 Pull Request
   - CI 检查通过后可以合并
   - 合并后自动触发部署

## 最佳实践

1. **分支管理**

   - 使用功能分支进行开发
   - 通过 PR 合并到 main 分支
   - 保持分支最新，经常从 main 分支同步

2. **提交规范**

   - 使用语义化的提交信息
   - 示例：`feat: add new feature` 或 `fix: resolve bug`

3. **代码审查**

   - 所有改动都需要通过 PR 审查
   - 确保 CI 检查通过
   - 及时响应审查意见

4. **监控和日志**
   - 定期检查部署日志
   - 关注性能指标
   - 及时处理告警信息
