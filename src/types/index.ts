import type { LocationQueryValue } from 'vue-router'

type productString = {
  [key in 'goodsCoverImg' | 'goodsDetailContent' | 'goodsIntro' | 'goodsName' | 'tag']: string
}

type productNumber = {
  [key in 'goodsId' | 'originalPrice' | 'sellingPrice']: number
}

export type ProductItem = {
  goodsCarouselList: Array<any>
} & productString &
  productNumber

export type ProductListState = {
  keyword: LocationQueryValue[] | string
  searchBtn: boolean
  seclectActive: boolean
  refreshing: boolean
  loading: boolean
  finished: boolean
  list: Array<any>
  productList: Array<any>
  totalPage: number
  page: number
  orderBy: string
}
