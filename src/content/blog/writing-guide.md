---
title: 'HaloMoon 写作指南'
description: '双击一个文件，写完文章后自动构建、提交并发布。'
pubDate: '2026-09-17'
updatedDate: '2026-09-17'
tags: ['写作', 'Markdown']
---
最快方式是直接双击项目根目录中的：

```text
发布文章.cmd
```

脚本会询问文章标题、摘要、标签和链接名，然后自动打开记事本。**写完正文，保存并关闭记事本即可**，后续步骤全部自动完成：

```text
检查正文 → Astro 构建 → Git 提交 → 推送 GitHub → 自动部署服务器
```

通常推送后等待一两分钟，新文章就会出现在网站中。

## 命令行方式

也可以进入博客源码目录后运行：

```powershell
npm run publish
```

根据提示输入：

```text
文章标题：Linux 网络配置笔记
一句话摘要：记录服务器网络配置和排错过程
标签：Linux,网络
英文链接名：linux-network-notes
```

链接名可以直接回车使用自动生成的值。记事本打开后，只写正文即可，不需要手动处理 Front Matter。

## Markdown 示例

```markdown
## 二级标题

普通段落可以直接书写。

- 列表项目
- 另一个项目

> 这里是一段引用。
```

代码块需要标注语言：

```c
#include <stdio.h>

int main(void) {
    printf("Hello, HaloMoon!\n");
    return 0;
}
```

## 发布失败怎么办

如果正文为空，脚本会保留文章文件但停止发布。补充正文后可以重新执行：

```powershell
npm run build
git add .
git commit -m "docs: publish article"
git push
```
