---
title: 'HaloMoon 内容发布指南'
description: '通过两个 GitHub 仓库快速发布正式文章和 Markdown 学习笔记。'
pubDate: '2026-09-17'
updatedDate: '2026-09-17'
tags: ['写作', 'Markdown', 'GitHub']
---
HaloMoon 将内容分为两类：

- **学习笔记**保存在独立的 `HaloMoon-Notes` 仓库，适合日常快速记录。
- **正式文章**保存在 `HolyLinux` 博客仓库，适合完整教程和长文。

## 最快发布学习笔记

进入 `HaloMoon-Notes` 文件夹，双击：

```text
manage-notes.cmd
```

在 Linux 中运行：

```bash
chmod +x manage-notes.sh
./manage-notes.sh
```

选择“新建笔记并发布”，输入分类、标题和链接名，写完 Markdown 后保存。脚本会自动提交并推送 GitHub，GitHub Actions 随后重新构建并部署博客。

目录和博客网址一一对应：

```text
notes/linux/network.md
→ https://www.halomoon.cn/notes/linux/network/
```

删除笔记也使用同一脚本；远端文件删除后，对应页面会随下一次部署一起消失。

## 发布正式文章

在博客源码目录双击：

```text
publish-article.cmd
```

在 Linux 中运行：

```bash
chmod +x publish-article.sh
./publish-article.sh
```

也可以运行：

```powershell
npm run publish
```

输入标题、摘要、标签和英文链接名后，编辑生成的 Markdown 正文并保存。脚本会完成检查、构建、提交和推送。

## Markdown 示例

```markdown
## 二级标题

普通段落可以直接书写。

- 列表项目
- 另一个项目

> 这里是一段引用。
```

代码块请标注语言：

```c
#include <stdio.h>

int main(void) {
    printf("Hello, HaloMoon!\n");
    return 0;
}
```
