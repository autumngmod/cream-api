# cream-api
Small module that adds functions that allow communication between [cream (Garry's Mod)](https://github.com/autumngmod/cream) and JavaScript.

# Installation
```
npm i @autumngmod/cream-api
# or using bun
bun i @autumngmod/cream-api
```

# Usage example
```ts
import { call } from "cream-api";

// calls the 'getUsername' function in Garry's Mod
// which returns to JavaScript the LocalPlayer's username
let username: string = await call("getUsername");

console.log(`LocalPlayer's username is ${username}`);
```