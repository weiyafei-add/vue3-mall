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
