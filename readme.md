# ls-remote-versions

A tool to list the versions available on your registry by semver range. Great for all those **behind the firewall** as you may not have all
the versions that the public registry has.

<p align="center">
	<img src="https://cdn.rawgit.com/ghinks/ls-remote-versions/feature/add-gif-lsr4/ls-remote-versions.gif">
</p>

## installation

npm install -g ls-remote-versions

## usage

```
ls-remote-versions <package-name>
```

example


```
ls-remote-versions express
```

will list all of the versions of express in your registry satisfying the semver range as implemented in [semver](https://www.npmjs.com/package/semver)


example
```
ls-remote-versions express 4
```

example
```
ls-remote-versions express '4.0.x'
```

example
```
ls-remote-versions express '4 - 5'
express
4.15.0
4.15.1
4.15.2
4.15.3
4.15.4
4.15.5
...
```

will list all of the versions of express in your registry that match the semver range 4

This may be used as part of a program

```
const ls = require('ls-remote-versions').default;

ls('debug', '2').then(result => console.log(result));
```

### Advanced usage to diff registries

```
ls-remote-versions <package-name> -r otherRegistryUrl
```

example
```
ls-remote-versions node-sass -r http://localhost:4873
```

This will log out all the registry and diff versions in the alternate registry.
In this case a local registry hosted using [verdaccio](https://www.npmjs.com/package/verdaccio)


<p align="center">
	<img src="https://cdn.rawgit.com/ghinks/ls-remote-versions/feature/lsr-alt-reg-gif/lsr-alt-registry.gif">
</p>

## features

- tested on node 4 onwards
- alternative to npm view <package-name> versions which does not search
- great for corporate use behind the firewall
- takes semver range as a second arg to enable registry searches
- use the registry as defined in **npm config get registry**
- can be required in a program


## notes

This is a search based alternative to npm view <package-name> versions tool.

This tool is intended to aid the diagnosis of installation issues for users using a private registry. That may not have
all the versions of a package that are available on the public registries.

It will use the registry set in the npm configuration ( usually registry.npmjs.org, but which can be set to anything )

Please use npm config list or npm config get registry to see your current settings.
