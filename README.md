# [Logseq](https://logseq.com) done time plugin

This Logseq plugin adds a property to task blocks when they are marked as done.
This can be used for creating reports for tasks done yesterday, last week etc.

Look for "done time" in the Logseq Marketplace.

## Features

* Adds a "done-ms" property to tasks when they are marked as DONE.
* This property is in milliseconds to support sorting and precise filtering in queries.

## Example queries

### Tasks DONE Today

```
{:title [:b "DONE today"]
:query [:find (pull ?b [*])
    :in $ ?start
    :where
     [?b :block/marker ?marker]
     [(contains? #{"DONE"} ?marker)]
     [?b :block/properties ?props]
     [(get ?props :done-ms) ?done-ms]
     [(>= ?done-ms ?start)]
]
:inputs [:start-of-today-ms]
}
```

### Tasks DONE yesterday

```
#+BEGIN_QUERY
{:title [:b "DONE yesterday"]
:query [:find (pull ?b [*])
    :in $ ?start ?end
    :where
     [?b :block/marker ?marker]
     [(= "DONE" ?marker)]
     [?b :block/properties ?props]
     [(get ?props :done-ms) ?done-ms]
     [(>= ?done-ms ?start)]
     [(< ?done-ms ?end)]
]
:inputs [:-1d-start :start-of-today-ms]
}
```

## Credit

This plugin in heavily inspired by XXX


## How to release

1. `yarn build`
2. `git commit -am "up build" && git push`
3. Make release in Github.
