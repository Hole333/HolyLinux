# HaloMoon 最快写作方式

在项目目录执行：

```powershell
npm run publish
```

输入标题、摘要和标签后，脚本会打开记事本。写完正文，保存并关闭记事本，系统会自动：

1. 检查正文；
2. 执行 Astro 构建；
3. 创建 Git 提交；
4. 推送 GitHub；
5. 通过 GitHub Actions 自动更新服务器。

网页说明位于 `/blog/writing-guide/`。
