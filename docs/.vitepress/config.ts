import { defineConfig } from "vitepress";
import { basename } from "node:path";
const GITHUB_REPOSITORY = basename(process.env.GITHUB_REPOSITORY || "");
export default defineConfig({
  base: GITHUB_REPOSITORY ? `/${GITHUB_REPOSITORY}/` : "/",
  title: "TypeScript笔记",
  description: "回顾以往使用ts的粗糙，痛定思痛决定回炉重造一下",
  /* 去除url上.html后缀 */
  cleanUrls: true,
  themeConfig: {
    logo: "/logo.ico",
    nav: [
      { text: "首页", link: "/" },
      { text: "笔记", link: "/basic/introduce" },
    ],
    sidebar: [
      {
        text: "入门",
        items: [{ text: "基本介绍", link: "/basic/introduce" }],
      },
      {
        text: "语法",
        items: [
          { text: "类型语法", link: "/grammar/type" },
          { text: "工具类型", link: "/grammar/tools" },
        ],
      },
      {
        text: "配置",
        items: [
          { text: "配置文件", link: "/config/config" },
          {
            text: "声明文件",
            link: "/statement/statement",
          },
        ],
      },
      {
        text: "其他",
        items: [{ text: "其他内容", link: "/other" }],
      },
    ],
    outline: {
      level: "deep",
      label: "目录",
    },
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    /*  */
    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/AutumnFishs/ts-doc" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present autumnfish",
    },
    editLink: {
      pattern: "https://github.com/AutumnFishs/ts-doc/tree/main/:path",
      text: "在 GitHub 上编辑此页",
    },
  },
});
