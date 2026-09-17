# HaloMoon 最快写作方式

## 双击发布

直接双击项目根目录中的：

```text
发布文章.cmd
```

输入标题、摘要、标签和链接名后，记事本会自动打开。写完正文，保存并关闭记事本，系统会自动：

1. 检查正文；
2. 执行 Astro 构建；
3. 创建 Git 提交；
4. 推送 GitHub；
5. 通过 GitHub Actions 自动更新服务器。

## 命令行发布

也可以运行：

```powershell
npm run publish
```

网页说明位于 `/blog/writing-guide/`。
