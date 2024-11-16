import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AutumnFish",
  description: "回顾以往使用ts的粗糙，痛定思痛决定回炉重造一下",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "笔记", link: "/basic/introduce" },
    ],

    sidebar: [
      {
        text: "入门",
        items: [
          { text: "Ts基本介绍", link: "/basic/introduce" },
          { text: "Ts引入使用", link: "/basic/development" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
