# Installation

## Windows

有两种方法提取 Oracle JDK。

**EXE 文件运行提取**：

1. 执行安装程序，直到出现欢迎页面，不要点击下一步或关闭它。
2. 打开 `%USERPROFILE%\AppData\LocalLow\Oracle\Java`，转到 JDK 文件夹。
3. 有以下文件：
   - jdk1.8.0_20264.msi: the MSI installer
   - **sj**180202.cab: the JRE runnable
   - **ss**180202.cab: the **src.zip** we are looking for
   - **st**180202.cab: the tools.zip we can extract the JDK from
   - **sz**180202.cab: the COPYRIGHT file
4. 打开文件，并将 src.zip 和 tools.zip 复制到安全位置，因为关闭安装程序时 cab 文件将消失。

**7-Zip 提取**：

1. 运行 7-Zip，提取 JDK 安装程序。
2. 打开 `.rsrc\1033` 有以下文件：
   - JAVA_CAB7: the JRE runnable
   - JAVA_CAB9: the **src.zip** we are looking for
   - JAVA_CAB10: the tools.zip we can extract the JDK from
   - JAVA_CAB11: the COPYRIGHT file
3. 运行以下命令，再次提取我们需要的内容
   ```sh
   $ extrac32 JAVA_CAB7\108
   $ extrac32 JAVA_CAB9\110
   $ extrac32 JAVA_CAB10\111
   $ extrac32 JAVA_CAB11\112
   ```

最后转换 tools.zip 格式，.pack to .jar：

```sh
$ for /r %x in (*.pack) do .\bin\unpack200 -r "%x" "%~dx%~px%~nx.jar"
```

## Linux

### OpenJDK

```sh
$ yum install java-1.8.0-openjdk
```

### Oracle JDK

```sh
# vi /etc/profile
export JAVA_HOME=/usr/java/jdk1.8.0_211
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib:$CLASSPATH
export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin
export PATH=$PATH:${JAVA_PATH}
```


## 参考文献

- [Huawei Cloud Mirror](https://mirrors.huaweicloud.com/java/jdk/8u202-b08/)
- [Checksum](https://www.oracle.com/webfolder/s/digest/8u202checksum.html)
- [Amazon Corretto](https://aws.amazon.com/cn/corretto/)
- [AdoptOpenJDK](https://adoptopenjdk.net/)
- [Zulu](https://www.azul.com/downloads/)
- [RedHat](https://developers.redhat.com/products/openjdk/download)
- [Microsoft](https://www.microsoft.com/openjdk)
- [Extract src.zip from JDK Installer](https://bgasparotto.com/extract-src-zip-jdk-installer)
- [Convert JDK from EXE to ZIP](https://bgasparotto.com/convert-jdk-exe-zip)

