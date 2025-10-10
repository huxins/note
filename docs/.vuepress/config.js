const nav = require("./config/nav");

const 计算机硬件 = require("./config/计算机硬件/index");
const 计算机系统 = require("./config/计算机系统/index");
const 软件开发 = require("./config/软件开发/index");
const 生活技能 = require("./config/生活技能/index");

const 前端基础 = require("./config/前端基础/index");
const 前端开发 = require("./config/前端开发/index");

const 后端语言 = require("./config/后端语言/index");
const 后端开发 = require("./config/后端开发/index");

const 运维部署 = require("./config/运维部署/index");
const 操作系统 = require("./config/操作系统/index");

module.exports = {
  title: "偷影子的人",
  description: "你在，春华秋实夏蝉冬雪。",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  base: "/",
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    nextLinks: false,
    prevLinks: false,
    sidebarDepth: 2,
    nav: nav,
    sidebar: {
      "/001 - 计算机硬件/外设配件/": 计算机硬件.外设配件,
      "/001 - 计算机硬件/存储设备/": 计算机硬件.存储设备,
      "/001 - 计算机硬件/整机系统/": 计算机硬件.整机系统,

      "/002 - 计算机系统/存储管理/": 计算机系统.存储管理,
      "/002 - 计算机系统/数据表示/": 计算机系统.数据表示,
      "/002 - 计算机系统/数据结构/": 计算机系统.数据结构,

      "/003 - 软件开发/开发工具/": 软件开发.开发工具,
      "/003 - 软件开发/软件服务/": 软件开发.软件服务,
      "/003 - 软件开发/软件工程/": 软件开发.软件工程,
      "/003 - 软件开发/网络技术/": 软件开发.网络技术,
      "/003 - 软件开发/文件格式/": 软件开发.文件格式,

      "/004 - 生活技能/购物指南/": 生活技能.购物指南,
      "/004 - 生活技能/娱乐游戏/": 生活技能.娱乐游戏,

      "/101 - 前端基础/CSS/": 前端基础.CSS,
      "/101 - 前端基础/HTML/": 前端基础.HTML,
      "/101 - 前端基础/JavaScript/": 前端基础.JavaScript,

      "/102 - 前端开发/Vanilla/": 前端开发.Vanilla,
      "/102 - 前端开发/Vue/": 前端开发.Vue,

      "/201 - 后端语言/CSharp/": 后端语言.CSharp,
      "/201 - 后端语言/Java/": 后端语言.Java,
      "/201 - 后端语言/Node/": 后端语言.Node,
      "/201 - 后端语言/Python/": 后端语言.Python,

      "/202 - 后端开发/Database/": 后端开发.Database,

      "/301 - 运维部署/Cloud/": 运维部署.Cloud,
      "/301 - 运维部署/Command/": 运维部署.Command,
      "/301 - 运维部署/DevOps/": 运维部署.DevOps,
      "/301 - 运维部署/Proxmox VE/": 运维部署.PVE,

      "/302 - 操作系统/Linux/": 操作系统.Linux,
      "/302 - 操作系统/Windows/": 操作系统.Windows,
    },
  },
};
