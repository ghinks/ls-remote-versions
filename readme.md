# ls-remote-versions

A tool to list the version available on your registry. Great for all those **behind the firewall** as you may not have all
the versions that the public registry has.

## installation

npm install ls-remote-versions

## usage

```
ls-remote-versions express
```

will list all of the versions of express in your registry

```
ls-remote-versions express 4
```

will list all of the versions of express in your registry that match the expression 4

( The second argument is used to form a RegExp so escape it if you use periods )


```
ls-remote-versions express 4\.1\.\d
```

## features

- tested on node 4 onwards
- great for corporate use behind the firewall
- takes regex as second arg to enable registry searches
- use the registry as defined in **npm config get registry**
