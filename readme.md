# ls-remote-versions

A tool to list the versions available on your registry by semver range. Great for all those **behind the firewall** as you may not have all
the versions that the public registry has.

## installation

npm install ls-remote-versions

## usage

```
ls-remote-versions express
```

will list all of the versions of express in your registry satisfying the semver range as implemented in [semver](https://www.npmjs.com/package/semver)

```
ls-remote-versions express 4
```

```
ls-remote-versions express '4.0.x'
```

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
