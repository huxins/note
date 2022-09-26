# URL schemes

## 支付宝

| 功能   | 平台 | url scheme                                                   | 已验证可用 |
| ------ | ---- | ------------------------------------------------------------ | ---------- |
| 扫一扫 | 安卓 | alipayqr://platformapi/startapp?saId=10000007                | ✅          |
| 付款码 | 安卓 | alipayqr://platformapi/startapp?saId=20000056                | ✅          |
| 健康码 | 安卓 | alipays://platformapi/startapp?appId=20000067&url=https://68687564.h5app.alipay.com/www/index.html | ✅          |
| 乘车码 | 安卓 | alipayqr://platformapi/startapp?saId=200011235               | ✅          |

## 微信

| 功能   | url scheme                                                   | 已验证可用 |
| ------ | ------------------------------------------------------------ | ---------- |
| 扫一扫 | weixin://scanqrcode                                          | ✅          |
| 扫一扫 | [链接](android-app://com.tencent.mm/#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=com.tencent.mm;component=com.tencent.mm/.ui.LauncherUI;B.LauncherUI.From.Scaner.Shortcut=true;end) |            |
| 付款码 | [链接](android-app://com.tencent.mm/#Intent;action=com.tencent.mm.action.BIZSHORTCUT;launchFlags=0x4000000;S.LauncherUI.Shortcut.LaunchType=launch_type_offline_wallet;end) |            |

## 云闪付

| 功能   | url scheme                     | 已验证可用 |
| ------ | ------------------------------ | ---------- |
| 扫一扫 | upwallet://native/scanCode     | ✅          |
| 付款码 | upwallet://native/codepay      | ✅          |
| 付款码 | upwallet://pay                 | ✅          |
| 乘车码 | upwallet://rn/rnhtmlridingcode | ✅          |

## 随申办

| 功能       | url scheme                                    | 已验证可用 |
| ---------- | --------------------------------------------- | ---------- |
| 随申码     | shaismy://platformapi/startapp?code=SUISHENMA | ✅          |
| 扫一扫     | shaismy://platformapi/startapp?code=SCANCODE  | ✅          |
| 核酸查询   | shaismy://platformapi/startapp?code=HSJC      | ✅          |
| 核酸码     | shaismy://platformapi/startapp?code=HSM       | ✅          |
| 核酸采样点 | shaismy://platformapi/startapp?code=HSJCD     | ✅          |

## 参考文献

- [JdaieLin/health-code-url-scheme](https://github.com/JdaieLin/health-code-url-scheme)

