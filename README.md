# [Logseq](https://logseq.com) done time plugin

This simple Logseq plugin adds a property to task blocks when they are marked
as done. This can be used for creating reports for tasks done yesterday, last
week etc.

Look for "done time" in the Logseq Marketplace.

## Features

* Adds a `done-ms` property to tasks when they are marked as DONE.
* This property is in milliseconds to support sorting and precise filtering in queries.
* The property is removed if a task's state changes from DONE to anything else.

## Example queries

### Tasks DONE Today

```
{
  :title [:b "DONE today"]
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
{
  :title [:b "DONE yesterday"]
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

## Tips

The `done-ms` property isn't particularly nice to look at so I recommend hiding it using the `:block-hidden-properties` option in your `config.edn`.

For example:

```edn
  ::block-hidden-properties #{:done-ms}
```

Alternatively, the [Awesome Props](https://github.com/yoyurec/logseq-awesome-props) plugin can be used to hide the property from view mode while still allowing it to be seen when editing.

## Credit

This plugin in heavily inspired by the
[Task completion plugin](https://github.com/DimitryDushkin/logseq-plugin-task-check-date)
by [DimitryDushkin](https://github.com/DimitryDushkin), and the
[DONE task property plugin](https://github.com/YU000jp/logseq-plugin-confirmation-done-task)
by [YU000jp](https://github.com/YU000jp).


## How to release

1. `yarn build`
2. Commit the changes.
3. `git push`
4. Make release in GitHub.
