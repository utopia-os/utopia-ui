/**
 * @category Types
 */
export interface AssetsApi {
  upload(file: Blob, title: string): Promise<{ id: string }>
  url: string
}
