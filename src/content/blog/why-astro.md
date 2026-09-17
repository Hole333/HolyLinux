---
title: '个人博客为什么适合 Astro'
description: '内容优先、零数据库和按需 JavaScript，让博客保持简单。'
pubDate: '2026-09-14'
heroImage: '../../assets/why-astro.svg'
tags: ['Astro', '架构']
---
Astro 的默认输出是静态 HTML。只有页面确实需要交互时，才会向浏览器发送对应的 JavaScript。

这非常适合个人博客：文章是主体，交互只是辅助。

```text
Markdown → Astro 构建 → HTML/CSS → Caddy
```

目前 HolyLinux 只保留深浅色切换和轻量点击反馈，搜索、评论和后台编辑等功能等到真正需要时再加入。


