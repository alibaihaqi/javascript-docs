# General Info

**Bun is a fast JavaScript all-in-one toolkit.** - [Bun](https://bun.sh/)

`Bun` could be a game changer in `JavaScript environment` . It covers a lot of areas where we use different package or resource. You could use it as:
- **JavaScript Runtime**: I use
- **Package Manager**
- **Bundler**
- **Test Runners**

And you could use it 

## Installation

You could install `Bun` through this steps or follow [official documentation](https://bun.sh/docs/cli/install):
::: code-group
```bash [curl latest version]
# For MacOS, Linux, and WSL (Windows Subsystem for Linux)
# install the latest version
$ curl -fsSL https://bun.sh/install | bash
```

```bash [curl specific version]
# For MacOS, Linux, and WSL (Windows Subsystem for Linux)
# install the specific version
$ curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.0"
```

```bash [NPM]
$ npm install -g bun 
```

```bash [Homebrew]
$ brew tap oven-sh/bun
$ brew install bun
```

```bash
$ docker pull oven/bun
$ docker run --rm --init --ulimit memlock=-1:-1 oven/bun
```
:::

After the installation, you could check whether the process is succeed or not through this command:
```bash
$ bun --version
```

![Bun Version](/assets/bun/bun-version.png)

## Upgrade Version
If you already have Bun installed on your local and you want to update, you can update by running this command:
```bash
$ bun upgrade
```

![Bun Upgrade](/assets/bun/bun-upgrade.png)