# HaloMoon 内容发布

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

Windows：

```text
publish-notes.cmd
```

Linux：

```bash
./publish-notes.sh
```

文章会统一显示在网站的“文章”栏目和 `/blog/分类/文件名/` 路径中。

## 支持的 Markdown

支持 GFM 表格、任务列表、删除线、脚注、代码块、本地及远程图片、行内公式和块级公式。

```markdown
行内公式：$E=mc^2$

块级公式：
$$
E=mc^2
$$

图片：
![说明](image/example.png)
```

## 博客仓库正式文章

Windows：`publish-article.cmd`

Linux：`./publish-article.sh`

也可以运行 `npm run publish`。
