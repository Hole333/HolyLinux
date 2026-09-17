# HaloMoon

HaloMoon 是一个使用 Astro 生成的轻量中文静态博客。

## 内容仓库

- 博客源码与正式文章：[Hole333/HolyLinux](https://github.com/Hole333/HolyLinux)
- Markdown 学习笔记：[Hole333/HaloMoon-Notes](https://github.com/Hole333/HaloMoon-Notes)

笔记目录直接映射为博客路径：

```text
notes/linux/network.md → /notes/linux/network/
```

Windows 使用 `manage-notes.cmd`，Linux 使用 `./manage-notes.sh`，即可新建、删除、拉取或同步笔记。推送后 GitHub Actions 会自动构建并部署网站。

## 本地开发

```bash
npm install
npm run dev
```

启动前会自动拉取最新笔记。

## 构建

```bash
npm run build
```

生成结果位于 `dist/`。

## 线上地址

https://www.halomoon.cn/

详细写作说明见 [WRITING.md](./WRITING.md)。
