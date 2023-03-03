export type ItemObtain = {
  name?: string
  isRecommended?: boolean
}
export type Item = {
  id?: number
  itemId?: string
  name?: string
  obtains?: ItemObtain[]
}
