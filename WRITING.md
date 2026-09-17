# HolyLinux 写作指南

完整的网页版本位于 `/blog/writing-guide/`。

## 快速开始

1. 在 `src/content/blog/` 创建一个 `.md` 文件。
2. 添加 `title`、`description`、`pubDate` 和 `tags`。
3. 使用 Markdown 编写正文，代码围栏后填写语言名称。
4. 执行 `npx astro dev --background` 预览。
5. 执行 `npm run build` 检查。
6. 提交并推送到 GitHub。

示例：

```markdown
---
title: '文章标题'
description: '文章摘要'
pubDate: '2026-09-17'
tags: ['Linux']
---

## 正文标题

正文内容。
```
