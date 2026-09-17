---
title: 'HaloMoon 写作指南'
description: '如何使用 Markdown 编写、预览并发布 HaloMoon 文章。'
pubDate: '2026-09-17'
tags: ['写作', 'Markdown']
---
HaloMoon 的文章都保存在 `src/content/blog/` 目录中。每篇文章是一个普通的 Markdown 文件，可以使用任意文本编辑器编写。

## 1. 新建文章

在 `src/content/blog/` 中创建文件，文件名使用简短的英文或拼音，例如：

```text
src/content/blog/linux-network-notes.md
```

文章开头必须包含 Front Matter：

```yaml
---
title: 'Linux 网络配置笔记'
description: '记录一次服务器网络配置的过程与排错方法。'
pubDate: '2026-09-17'
updatedDate: '2026-09-17'
tags: ['Linux', '网络']
---
```

`updatedDate` 可以省略。需要封面时，将图片放入 `src/assets/`，并增加：

```yaml
heroImage: '../../assets/your-cover.svg'
```

## 2. 编写正文

正文使用标准 Markdown：

```markdown
## 二级标题

普通段落可以直接书写。

- 列表项目
- 另一个项目

> 这里是一段引用。
```

代码块需要标注语言，网站会自动完成语法高亮：

```c
#include <stdio.h>

int main(void) {
    printf("Hello, HaloMoon!\n");
    return 0;
}
```

常用语言标记包括 `bash`、`powershell`、`javascript`、`typescript`、`python`、`c`、`cpp` 和 `json`。

## 3. 本地预览

第一次使用时安装依赖：

```powershell
npm install
```

启动后台预览：

```powershell
npx astro dev --background
```

浏览器访问 `http://127.0.0.1:4321/`。完成后停止预览：

```powershell
npx astro dev stop
```

## 4. 构建和提交

发布前执行：

```powershell
npm run build
git add .
git commit -m "docs: add linux network notes"
git push
```

构建成功后，静态文件位于 `dist/`。服务器发布时只需要替换当前静态 release，不需要数据库。

