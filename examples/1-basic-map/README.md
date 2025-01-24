# Example 1: Basic Map

In this example we see how we create a basic React app with a Map component using [utopia-ui](https://github.com/utopia-os/utopia-ui) library.

For this example we use Vite to create an empty React app called "utopia-static-map"

```shell
npm create vite@latest utopia-static-map -- --template react-ts
```

We open our new app in the terminal and install the [utopia-ui](https://github.com/utopia-os/utopia-ui) package

```shell
cd utopia-static-map
npm install utopia-ui
```

We open our `src/App.tsx` and we replace the content with

```tsx
import { UtopiaMap } from "utopia-ui"

function App() {
  return (
    <UtopiaMap center={[50.6, 9.5]} zoom={5} height='100dvh' width="100dvw">
    </UtopiaMap>
  )
}

export default App

```

Then we start the development server to check out the result in our browser:

```shell
npm run dev
```

And can open our first map app in the browser 🙂

In [Tutorial 2](../2-static-layers/) we gonna add some static data to our map
