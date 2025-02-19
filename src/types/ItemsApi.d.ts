/**
 * @category Types
 */
export interface ItemsApi<T> {
  getItems(): Promise<T[]>
  getItem?(id: string): Promise<T>
  createItem?(item: T): Promise<T>
  updateItem?(item: Partial<T>): Promise<T>
  deleteItem?(id: string): Promise<boolean>
  collectionName?: string
}
