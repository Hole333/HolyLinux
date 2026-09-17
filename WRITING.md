# HaloMoon 内容发布

HaloMoon 的长篇文章和学习笔记分开管理：

- **文章**：保存在博客仓库 `HolyLinux`，适合正式教程和长文。
- **学习笔记**：保存在独立仓库 `HaloMoon-Notes`，适合日常记录，目录会直接映射为博客分类和网址。

## 最快发布学习笔记

打开 `HaloMoon-Notes` 文件夹，双击：

```text
manage-notes.cmd
```

Linux：

```bash
chmod +x manage-notes.sh
./manage-notes.sh
```

选择“新建笔记并发布”，写完 Markdown 后保存。脚本会提交并推送 GitHub，随后自动更新博客。

```text
notes/linux/network.md → /notes/linux/network/
```

删除笔记也使用同一个脚本。远端文件删除后，对应博客页面会在自动部署完成后消失。

## 发布正式文章

在博客项目根目录双击：

```text
publish-article.cmd
```

Linux：

```bash
chmod +x publish-article.sh
./publish-article.sh
```

也可以运行：

```powershell
npm run publish
```

网页说明位于 `/blog/writing-guide/`。
