/**
 * Tags are used to tag items within the app and the map and to filter by keywords. Every tag has a color.
 * @example
 * ```ts
 * export const tags: Tag[] = [
 *  { 
 *   "id": "e19f46a7-77a4-4a50-99a2-a942dce843a3",
 *   "name": "nature",
 *   "color": "#9bc53d"
 * },
 * {
 *   "id": "2c2099a6-23ac-4308-b91c-86eefeff3a1d",
 *   "name": "utopia",
 *   "color": "#c3423f"
 * },
 * {
 *   "id": "48b2de97-2b9e-432b-b230-7bdc9a5fb6c0",
 *   "name": "map",
 *   "color": "#5bc0eb"
 * },
 * {
 *   "id": "c88f52e6-357b-45fb-a171-9c2b1dceeb8e",
 *   "name": "food",
 *   "color": "#6761a8"
 * },
 * {
 *   "id": "8928cb92-a3c1-4d83-9495-c2eb4fac0bbe",
 *   "name": "permaculture",
 *   "color": "#44344f"
 * },
 *];
```
 * @category Types
 */
export interface Tag {
  color: string
  id: string
  name: string
  offer_or_need?: boolean
}
