# Example 1: Basic Map  

In this example, we'll learn how to create a **basic React app** with a map component using the [utopia-ui](https://github.com/utopia-os/utopia-ui) library.  

### Setting Up the Project  

We'll use **Vite** to create an empty React app named **"1-static-map"**:  

```shell
npm create vite@latest 1-static-map -- --template react-ts
```  

Next, we navigate into our project folder and install the [utopia-ui](https://github.com/utopia-os/utopia-ui) package:  

```shell
cd 1-static-map
npm install utopia-ui
```  

### Implementing the Map  

Now, we open `src/App.tsx` and replace its content with the following:  

```tsx
import { UtopiaMap } from "utopia-ui";

function App() {
  return (
    <UtopiaMap center={[50.6, 9.5]} zoom={5} height="100dvh" width="100dvw" />
  );
}

export default App;
```  

### Running the Application  

To see our **first map app**, we start the development server:  

```shell
npm run dev
```  

Now, we can open the project in the browser and explore our interactive map! 😊  

➡️ In [Example 2](../2-static-layers/), we'll add **static data** to our map.  
