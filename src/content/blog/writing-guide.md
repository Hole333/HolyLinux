---
title: 'HaloMoon 内容发布指南'
description: '使用普通 Markdown 文件一键发布学习笔记和正式文章。'
pubDate: '2026-09-17'
updatedDate: '2026-09-17'
tags: ['写作', 'Markdown', 'GitHub']
---
## 学习笔记：一键发布

直接把 Markdown 文件放入分类目录。例如：

```text
notes/structured_light/my-note.md
```

Markdown 第一行的一级标题会成为博客标题，父文件夹会自动成为分类和标签：

```markdown
# 利用散斑嵌入条纹和查找表进行三维面形测量

这里直接编写正文，不需要填写摘要、标签、Front Matter 或 URL。
```

写完后只运行一个文件。

Windows：

```text
publish-notes.cmd
```

Linux：

```bash
./publish-notes.sh
```

发布器会自动生成博客所需元数据，提交全部 Markdown 改动，推送 GitHub 并触发部署。删除 Markdown 文件后运行同一个命令，对应博客页面也会删除。

## 正式文章

Windows：

```text
publish-article.cmd
```

Linux：

```bash
./publish-article.sh
```

也可以运行：

```bash
npm run publish
```

