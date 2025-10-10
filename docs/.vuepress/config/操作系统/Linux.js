const 存储系统 = ["./存储系统/LVM"];

const 发行版 = ["./发行版/Debian", "./发行版/RPM", "./发行版/YUM"];

const 脚本开发 = [
  "./脚本开发/Bash",
  "./脚本开发/crontab",
  "./脚本开发/Systemd",
];

const 系统安全 = ["./系统安全/OpenSSH", "./系统安全/Sudo"];

const Linux = [
  {
    title: "存储系统",
    children: 存储系统,
  },
  {
    title: "发行版",
    children: 发行版,
  },
  {
    title: "脚本开发",
    children: 脚本开发,
  },
  {
    title: "系统安全",
    children: 系统安全,
  },
];

module.exports = Linux;
