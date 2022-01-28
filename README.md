# mono_modules [![npm][1]][2]

Install modules from monorepos and Git subfolders.

## Installation

```sh
npm install -g mono_modules
```

## Usage

Installing mono_modules globally provides access to the `mono_modules` command:

```sh
mono_modules [command]
```

Run help command for detailed information about each command:

```sh
mono_modules help [command]
```

## Commands

### `init`

Initialize mono_modules on the current repository.

> Note: this command is intended to be called in the `preinstall` script, inside
> `package.json`.

#### Example

```json
{
  "scripts": {
    "preinstall": "npx -y mono_modules init"
  }
}
```

### `install [options] <repository> <directory>`

Install a submodule from a repository.

#### Options

##### `-p, --persist`

Instead of storing the submodule in `./node_modules/.mono_modules`, it will be
stored inside `./mono_modules` dir. Use this option if the submodule should be
committed to the repository. This option is useful if you use submodules from
private repositories and need to build the app in an unauthenticated server —
e.g. Netlify, Vercel, etc.

#### Example

```sh
mono_modules install vercel/next.js packages/next
```

### `update`

Update installed submodules to the latest commit version of the repository.

## Compatibility

- GitHub.

## Caveats

This module is still in its early stages of development and is subject to
change. If you find a bug or need a specific feature, please don't hesitate to
open an issue.

## License

[The MIT License][license]

[1]: https://img.shields.io/npm/v/mono_modules
[2]: https://www.npmjs.com/package/mono_modules
[license]: ./LICENSE
