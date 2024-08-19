export enum GlobalKeys {
  Loading = "loading",
  NewsFeedLoading = "newsFeedLoading",
  Error = "error",
  status = "status",
  totalResults = "totalResults",
  data = "data",
  response = "response",
  results = "results",
  docs = "docs",
  sources = "sources",
  articles = "articles",
  theGuardianNewsSections = "theGuardianNewsSections",
  news = "news",
  newYorkTimes = "newYorkTimes",
  theguardianNews = "theguardianNews",
}

export enum QueryParamsKeys {
  category = "category",
  country = "country",
  sources = "sources",
  from = "from",
  to = "to",
}

export enum BuildQueryArgsKeys {
  category = "category",
  section = "section",
  q = "q",
  fq = "fq",
  from = "from",
  to = "to",
  fromDate = "from-date",
  toDate = "to-date",
  begin_date = "begin_date",
  end_date = "end_date",
  newsParams = "newsParams",
  gaurdianNewsParams = "gaurdianNewsParams",
  newyorkTimesParams = "newyorkTimesParams",
}

export enum NewYorkTimesNewsKeys {
  _id = "_id",
  abstract = "abstract",
  headline = "headline",
  main = "main",
  web_url = "web_url",
  multimedia = "multimedia",
  url = "url",
  byline = "byline",
  original = "original",
  pub_date = "pub_date",
  source = "source",
}

export enum TheGuardianNewsKeys {
  id = "id",
  type = "type",
  sectionId = "sectionId",
  sectionName = "sectionName",
  webPublicationDate = "webPublicationDate",
  webTitle = "webTitle",
  webUrl = "webUrl",
  apiUrl = "apiUrl",
  isHosted = "isHosted",
  pillarId = "pillarId",
  pillarName = "pillarName",
  editions = "editions",
}
