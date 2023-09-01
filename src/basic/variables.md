# Variables

There are 3 ways to declare variable in JS/TS.

| Variable Type | Block/Global Scope | Can be updated | Can be re-declare |
|:-------------:|:------------------:|:--------------:|:-----------------:|
|      var      |       Global       |        Y       |         Y         |
|      let      |        Block       |        Y       |         X         |
|     const     |        Block       |        X       |         X         |

You can check the simple explanation for each variable types.

:::code-group
```js [var]
var str = "var-a"

var str = "var-c" // Can be re-declare
str = "var-b" // Can be updated

console.log(str) // should be "var-b"
```

```js [let]
let str = "let-a"

let str = "let-c" // Error cannot be re-declare X
str = "let-b" // Can be updated

console.log(str) // should be "let-b"
```

```js [const]
const str = "const-a"

const str = "const-c" // Error cannot be re-declare
str = "const-b" // Error cannot be updated

console.log(str) // should be "const-a"
```
:::