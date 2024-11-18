import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TypeScript笔记",
  description: "回顾以往使用ts的粗糙，痛定思痛决定回炉重造一下",
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
        items: [{ text: "类型语法", link: "/grammar/type" }],
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
    ],
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
      copyright: "Copyright © 2024-present autumnfishs",
    },
    editLink: {
      pattern: "https://github.com/AutumnFishs/ts-doc/tree/main/:path",
      text: "在 GitHub 上编辑此页",
    },
  },
});
