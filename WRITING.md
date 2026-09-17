# HaloMoon 内容发布

## 学习笔记：一键发布

把普通 Markdown 文件放入对应分类目录：

```text
notes/structured_light/my-note.md
```

Markdown 第一行作为标题，父文件夹自动作为分类和标签：

```markdown
# 利用散斑嵌入条纹和查找表进行三维面形测量

这里直接编写正文。
```

不需要填写摘要、标签、Front Matter 或 URL。写完后运行一次：

Windows：

```text
publish-notes.cmd
```

Linux：

```bash
./publish-notes.sh
```

脚本会自动补齐元数据、提交 Git、推送 GitHub 并部署博客。删除 Markdown 文件后运行同一个命令，对应博客页面也会删除。

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
