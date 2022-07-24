
## !! Not ready for production, experimental

<p align="center">
<br>
<img src="https://avatars.githubusercontent.com/u/108695351?s=200&v=4" width="128" height="128">
</p>
<h3 align="center">@istanbul/typeorm</h3>
<p align="center">
  Typeorm package of <code>istanbul</code> framework. 
</p>

### Installation

```bash
npm install @istanbul/typeorm mysql
```

### Usage

Main file

```typescript
import { createApp, App } from "@istanbul/app";
import { createTypeorm } from "@istanbul/typeorm";
import { mainModule } from "./src/main.module"

const app : App = createApp(mainModule)
app.register(createTypeorm({
  /* ... typeorm options */
}))

app.start();
```

In module

```typescript
import { createModule, Module } from "@istanbul/app";
import { registerEntity } from "@istanbul/typeorm";
import { Product } from "./product.entity";

const productModule : Module = createModule("product", {
  imports: [
    registerEntity(Product)
  ]
})
```