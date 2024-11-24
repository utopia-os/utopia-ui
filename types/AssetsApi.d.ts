export interface AssetsApi {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload(file: Blob, title: string): any
  url: string
}
