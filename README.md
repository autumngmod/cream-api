# cream-api
Small module that adds functions that allow communication between [cream (Garry's Mod)](https://github.com/autumngmod/cream) and JavaScript.

# Installation
```
npm i @autumngmod/cream-api
# or using bun
bun i @autumngmod/cream-api
```

# Usage example
## Calling Lua function from JS
```ts
import { call } from "@autumngmod/cream-api";

// calls the 'getUsername' function in Garry's Mod
// which returns to JavaScript the LocalPlayer's username
let username: string = await call("getUsername");

console.log(`LocalPlayer's username is ${username}`);
```

## Listening for a event
```tsx
import { listen } from "@autumngmod/cream-api";
import { useState } from "react";

// payload of a event
interface MenuOpenedEvent {
  state: boolean
}

function ExampleComponent() {
  const [isOpen, setIsOpen] = useState(false);

  listen<MenuOpenedEvent>("changeMenuOpened", e => {
    setIsOpen(e.state)
  })

  return (
    <div hidden={!isOpen}>
      {...}
    </div>
  )
}
```