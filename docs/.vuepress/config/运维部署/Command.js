const 磁盘文件 = [
  "./磁盘文件/gdisk",
  "./磁盘文件/qemu-img",
  "./磁盘文件/restic",
  "./磁盘文件/s5cmd",
  "./磁盘文件/util-linux",
];

const 实用程序 = [
  "./实用程序/Coreutils",
  "./实用程序/debianutils",
  "./实用程序/findutils",
  "./实用程序/libc-bin",
  "./实用程序/procps",
  "./实用程序/Shadow-utils",
];

const 网络处理 = [
  "./网络处理/bsd-mailx",
  "./网络处理/curl",
  "./网络处理/ufw",
  "./网络处理/wget",
];

const 文本处理 = [
  "./文本处理/awk",
  "./文本处理/grep",
  "./文本处理/nano",
  "./文本处理/sed",
  "./文本处理/vim",
];

const Command = [
  "文件解压缩",
  {
    title: "磁盘文件",
    children: 磁盘文件,
  },
  {
    title: "实用程序",
    children: 实用程序,
  },
  {
    title: "网络处理",
    children: 网络处理,
  },
  {
    title: "文本处理",
    children: 文本处理,
  },
];

module.exports = Command;
