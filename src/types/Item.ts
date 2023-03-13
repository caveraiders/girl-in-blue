export type ItemObtain = {
  name?: string
  questId: string
  isMulti: boolean
  isDropAlways: boolean
  type: string
}
export type Item = {
  id?: number
  itemId?: string
  name?: string
  obtains?: ItemObtain[]
}
