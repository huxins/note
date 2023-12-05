# GitHub Actions

GitHub Actions 是 GitHub 提供的一种自动化工作流服务。

GitHub 有一个[官方市场](https://github.com/marketplace?type=actions)，可以搜索他人提交的 Actions。还有一个 [Awesome Actions](https://github.com/sdras/awesome-actions) 的仓库，也可以发现不少 Actions。

## 一、Workflow

Workflow 必须包含以下基本组件。详见 [Workflow basics](https://docs.github.com/en/actions/using-workflows/about-workflows#workflow-basics)。

- 将触发 Workflow 的一个或多个事件。
- 一个或多个 *jobs*，每个 *job* 将在 *runner* 机器上执行，并运行一系列的一个或多个 *steps*。
- 每个 *step* 都可以运行您定义的脚本或运行操作。

Workflow 在存储库的 `.github/workflows` 目录中定义，一个存储库可以有多个 Workflow，每个 Workflow 可以执行不同的任务集。

### 1.1. Workflow syntax

Workflow 是由一个或多个 *jobs* 组成的可配置自动化流程。必须创建 YAML 文件来定义 workflow 配置。详见 [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)。

#### 1.1.1. name

`name` 字段是 Workflow 的名称。如果省略该字段，默认为当前 Workflow 的文件名。

```yaml
name: GitHub Actions Demo
```

#### 1.1.2. run-name

`run-name` 字段是从 workflow 生成的 workflow runs 的名称。如果省略该字段，则 run name 将设置为 workflow run 的特定于事件的信息。例如，对于由 `push` 事件触发的 workflow，它被设置为 commit message。

```yaml
run-name: 'Deploy commit: ${{ github.event.head_commit.message }}'
```

#### 1.1.3. on

`on` 定义哪些事件可以导致 workflow 运行。详见 [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)。

```yaml
on: push
```

#### 1.1.4. jobs

工作流运行由一个或多个 `jobs` 组成，默认情况下并行运行。

```yaml
jobs:
  job1:
    name: My first job
  job2:
    name: My second job
```

### 1.2. Job syntax

#### 1.2.1. needs

`needs` 字段指定当前任务的依赖关系，即运行顺序。

```yaml
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```

#### 1.2.2. runs-on

`runs-on` 字段指定运行所需要的虚拟机环境。目前可用的虚拟机如下。详见 [GitHub Actions Runner Images](https://github.com/actions/runner-images)。

```
ubuntu-latest
ubuntu-22.04
ubuntu-20.04
```

#### 1.2.3. steps

`steps` 字段指定每个 Job 的运行步骤，可以包含一个或多个步骤。

```yaml
name: Greeting from Mona

on: push

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
      - name: Print a greeting
        env:
          MY_VAR: Hi there! My name is
          FIRST_NAME: Mona
          MIDDLE_NAME: The
          LAST_NAME: Octocat
        run: |
          echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```

### 1.3. Step syntax

#### 1.3.1. uses

- 指定版本。详见 [Using tags for release management](https://docs.github.com/en/actions/creating-actions/about-custom-actions#using-tags-for-release-management)。

  ```yaml
  steps:
    - name: 'Checkout codes'
      uses: actions/checkout@v1
  ```

#### 1.3.2. id

步骤的唯一标识符。可以使用 `id` 在上下文中引用步骤。

#### 1.3.3. if

可以使用条件语句 `if` 来阻止步骤运行，除非满足某个条件。

### 1.4. Workflow commands

在 workflow 或 action's code 中运行 Shell 命令时，可以使用 workflow commands。详见 [Workflow commands for GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions)。

大多数 workflow commands 使用特定格式的 `echo` 命令。

```sh
$ echo "::workflow-command parameter1={data},parameter2={data}::{command value}"
```

#### 1.4.1. 设置环境变量

`set-env` 可以设置环境变量。该命令以被弃用。

```yaml
name: 'Get Date'
env:
  ACTIONS_ALLOW_UNSECURE_COMMANDS: true
run: echo "::set-env name=REPORT_DATE::$(TZ=':Asia/Shanghai' date +'%Y-%m-%d %T')"
```

替代方案为通过 Environment files 设置环境变量。

```sh
$ echo "REPORT_DATE=$(TZ=':Asia/Shanghai' date +'%Y-%m-%d %T')" >> $GITHUB_ENV
```

#### 1.4.2. 设置输出参数

设置步骤的输出参数。

```sh
$ echo "SELECTED_COLOR=green" >> $GITHUB_OUTPUT
```

## 二、变量

### 2.1. 环境变量

要为单个 workflow 设置环境变量，可以使用 `env` 定义。

- Workflow：在 workflow 文件的顶层使用 `env`。
- Job：使用 `jobs.<job_id>.env`。
- Step：使用 `jobs.<job_id>.steps[*].env`。

```yaml
name: Greeting on variable day

on:
  workflow_dispatch

env:
  DAY_OF_WEEK: Monday

jobs:
  greeting_job:
    runs-on: ubuntu-latest
    env:
      Greeting: Hello
    steps:
      - name: "Say Hello Mona it's Monday"
        run: echo "$Greeting $First_Name. Today is $DAY_OF_WEEK!"
        env:
          First_Name: Mona
```

### 2.2. 上下文变量

上下文通常使用 `${{ context.property }}` 表示。

- `${{ env.MY_VARIABLE }}`
- `${{ github.repository }}`
- `${{ secrets.SuperSecret }}`

## 三、官方 Actions

### 3.1. actions/cache

此 action 允许缓存依赖项和构建输出以缩短工作流执行时间。详见 [Caching dependencies to speed up workflows](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)。

- 缓存 node_modules。

  ```yaml
  - name: Cache Node Dependencies
    id: cache
    uses: actions/cache@v3
    with:
      path: node_modules
      key: ${{ runner.os }}-npm-caches-${{ hashFiles('package-lock.json') }}
  
  - name: Install Dependencies
    if: steps.cache.outputs.cache-hit != 'true'
    run: npm install
  ```

### 3.2. actions/checkout

此 action 将代码仓库 checks-out 到 `$GITHUB_WORKSPACE` 下，使得工作流可以访问它。

```yaml
- name: Checkout
  uses: actions/checkout@v3
  with:
    persist-credentials: false
```

### 3.3. actions/setup-node

此 action 为 GitHub Actions 配置 Node.js 环境。

```yaml
- name: Setup node
  uses: actions/setup-node@v4
  with:
    node-version: 16
```

