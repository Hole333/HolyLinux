---
title: 'HaloMoon 内容发布指南'
description: '使用普通 Markdown 一键发布到统一文章栏目，并支持公式、图片和 GFM。'
pubDate: '2026-09-17'
updatedDate: '2026-09-17'
tags: ['写作', 'Markdown', 'GitHub']
---
## Markdown 文章：一键发布

把 Markdown 文件放进独立内容仓库的分类目录：

```text
notes/structured_light/my-article.md
```

第一行一级标题自动成为文章标题，父文件夹自动成为分类和标签：

```markdown
# 文章标题

这里直接编写正文。
```

写完后运行：

```text
publish-notes.cmd
```

Linux 使用：

```bash
./publish-notes.sh
```

文章会统一显示在“文章”栏目，地址为：

```text
/blog/structured_light/my-article/
```

## 公式与图片

支持行内 LaTeX 公式：$E=mc^2$。

块级公式：

$$
E=mc^2
$$

相对路径图片：

```markdown
![图片说明](image/example.png)
```

同时支持 GFM 表格、任务列表、删除线、脚注、代码块、HTML 和远程图片。

## 博客仓库正式文章

Windows 使用 `publish-article.cmd`，Linux 使用 `./publish-article.sh`，也可以运行 `npm run publish`。
