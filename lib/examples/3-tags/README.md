# Example 3: Tags

In [Example 2](/2-static-layers), we learned how to add layers with static data to our map.

Now, we'll introduce **tags** to structure our items and bring some color to the map. Tags allow us to categorize items using a simple **hash syntax**, such as `#utopia #map`, in the text field.

With tags, we can **filter the map** by clicking on them or searching for keywords in the search bar.

### Adding Tags to Our Data

To implement tags, we first define them in our `src/sample-data.ts` file:

```javascript
export const tags: Tag[] = [
  {
    "id": "e19f46a7-77a4-4a50-99a2-a942dce843a3",
    "name": "nature",
    "color": "#9bc53d"
  },
  {
    "id": "2c2099a6-23ac-4308-b91c-86eefeff3a1d",
    "name": "utopia",
    "color": "#c3423f"
  },
  {
    "id": "48b2de97-2b9e-432b-b230-7bdc9a5fb6c0",
    "name": "map",
    "color": "#5bc0eb"
  },
  {
    "id": "c88f52e6-357b-45fb-a171-9c2b1dceeb8e",
    "name": "food",
    "color": "#6761a8"
  },
  {
    "id": "8928cb92-a3c1-4d83-9495-c2eb4fac0bbe",
    "name": "permaculture",
    "color": "#44344f"
  },
];
```

and we add some hash tags to our sample items.

### Importing the Tags into Our App

Next, we import our sample data into `src/App.tsx`:

```tsx
import { tags } from "./sample-data";
```

### Integrating Tags into `<UtopiaMap>`

We then add the `<Tags>` component inside `<UtopiaMap>` and pass our `tags` from `sample-data.ts`:

```tsx
function App() {
  return (
    <UtopiaMap center={[50.6, 15.5]} zoom={5} height="100dvh" width="100dvw">
      ...
      <Tags data={tags} />
    </UtopiaMap>
  );
}

export default App;
```

### Running the Application

Finally, we start our development server to see the **enhanced map** with tags:

```shell
npm run dev
```
