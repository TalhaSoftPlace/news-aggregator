import {
  BuildQueryArgsKeys,
  GlobalKeys,
  NewYorkTimesNewsKeys,
  QueryParamsKeys,
  TheGuardianNewsKeys,
} from "../types/global";
import {
  ArticlesKeys,
  NewsKeys,
  SliceStateKeys,
  SourceKeys,
} from "../types/news";

export interface NewsState {
  [GlobalKeys.Loading]: boolean;
  [GlobalKeys.NewsFeedLoading]: boolean;
  [GlobalKeys.Error]: string | null;
  [GlobalKeys.totalResults]: number;
  [SliceStateKeys.newsFeeds]: NewsFeed[] | null;
  [GlobalKeys.originalArticles]: Article[] | null;
  [GlobalKeys.articles]: Article[] | null;
  [GlobalKeys.sources]: Sources[] | null;
  [GlobalKeys.theGuardianNewsSections]: TheGuardianNewsSections[] | null;
  [GlobalKeys.news]: Article[] | null;
  [GlobalKeys.newYorkTimes]: Article[] | null;
  [GlobalKeys.theguardianNews]: Article[] | null;
  [GlobalKeys.authors]: Authors;
}

export interface Authors {
  [GlobalKeys.newsAuthors]: string[] | null;
  [GlobalKeys.newYorkTimesAuthros]: string[] | null;
  [GlobalKeys.guardianAuthros]: string[] | null;
}
export interface SourceResponse {
  [SourceKeys.id]: string;
  [SourceKeys.name]: string;
}

export interface DefaultArticle {
  [ArticlesKeys.title]: string;
  [ArticlesKeys.description]: string;
  [ArticlesKeys.url]: string;
  [ArticlesKeys.urlToImage]: string;
}

export interface Article extends DefaultArticle {
  [SourceKeys.source]: SourceResponse;
  [ArticlesKeys.author]: string;
  [ArticlesKeys.publishedAt]: string;
  [ArticlesKeys.content]: string;
}

export interface NewsFeed extends DefaultArticle {}

export interface ArticlesResponse {
  [GlobalKeys.articles]: Article[];
}

export interface NewsProps {
  [NewsKeys.category]: string;
  [NewsKeys.country]: string;
}

export interface Sources {
  [SourceKeys.id]: string;
  [SourceKeys.name]: string;
  [SourceKeys.description]: string;
  [SourceKeys.url]: string;
  [SourceKeys.category]: string;
  [SourceKeys.language]: string;
  [SourceKeys.country]: string;
}

export interface SourcesResponse {
  [GlobalKeys.sources]: Sources[];
}

export interface GetNewsApiResponse {
  [GlobalKeys.data]: {
    [GlobalKeys.status]: string;
    [GlobalKeys.totalResults]: number;
    [GlobalKeys.articles]: Article[];
  };
}
export interface GetSourcesApiResponse {
  [GlobalKeys.data]: {
    [GlobalKeys.status]: string;
    [GlobalKeys.sources]: Sources[];
  };
}
export interface GetNewYorkTimesApiResponse {
  [GlobalKeys.data]: {
    [GlobalKeys.status]: string;
    [GlobalKeys.response]: {
      [GlobalKeys.docs]: NewYorkTimesNews[];
    };
  };
}

export interface GetTheGuardianNewsApiResponse {
  [GlobalKeys.data]: {
    [GlobalKeys.status]: string;
    [GlobalKeys.response]: {
      [GlobalKeys.results]: TheGuardianNews[];
    };
  };
}

export interface GetTheGuardianNewsSectionsApiResponse {
  [GlobalKeys.data]: {
    [GlobalKeys.status]: string;
    [GlobalKeys.response]: {
      [GlobalKeys.results]: TheGuardianNewsSections[];
    };
  };
}

export interface GetHeadlinesNewsActionPayload extends ArticlesResponse {
  [GlobalKeys.status]: string;
  [GlobalKeys.totalResults]: number;
}
export interface GetSourcesActionPayload extends SourcesResponse {
  [GlobalKeys.status]: string;
}

export interface QueryParamsProps {
  [QueryParamsKeys.category]: string;
  [QueryParamsKeys.country]: string;
  [QueryParamsKeys.sources]: string;
  [QueryParamsKeys.from]: string;
  [QueryParamsKeys.to]: string;
}

export interface BuildQueryArgs {
  [BuildQueryArgsKeys.category]: string;
  [BuildQueryArgsKeys.q]: string;
  [BuildQueryArgsKeys.from]?: string;
  [BuildQueryArgsKeys.to]?: string;
}
export interface BuildQueryType {
  [BuildQueryArgsKeys.newsParams]: {
    [BuildQueryArgsKeys.q]?: string;
    [BuildQueryArgsKeys.category]?: string;
    [BuildQueryArgsKeys.from]?: string;
    [BuildQueryArgsKeys.to]?: string;
  };
  [BuildQueryArgsKeys.gaurdianNewsParams]: {
    [BuildQueryArgsKeys.q]?: string;
    [BuildQueryArgsKeys.section]?: string;
    [BuildQueryArgsKeys.fromDate]?: string;
    [BuildQueryArgsKeys.toDate]?: string;
  };
  [BuildQueryArgsKeys.newyorkTimesParams]: {
    [BuildQueryArgsKeys.q]?: string;
    [BuildQueryArgsKeys.fq]?: string;
    [BuildQueryArgsKeys.begin_date]?: string;
    [BuildQueryArgsKeys.end_date]?: string;
  };
}

export interface NewYorkTimesHeadline {
  [NewYorkTimesNewsKeys.main]: string;
}

export interface NewYorkTimesAuthor {
  [NewYorkTimesNewsKeys.original]: string;
}

export interface NewYorkTimesMultimedia {
  [NewYorkTimesNewsKeys.url]: string;
}

export interface NewYorkTimesNews {
  [NewYorkTimesNewsKeys.abstract]: string;
  [NewYorkTimesNewsKeys.headline]: NewYorkTimesHeadline;
  [NewYorkTimesNewsKeys.byline]: NewYorkTimesAuthor;
  [NewYorkTimesNewsKeys.multimedia]: NewYorkTimesMultimedia[];
  [NewYorkTimesNewsKeys.web_url]: string;
  [NewYorkTimesNewsKeys.pub_date]: string;
  [NewYorkTimesNewsKeys.source]: string;
  [NewYorkTimesNewsKeys._id]: string;
}

export interface TheGuardianNewsDefault {
  [TheGuardianNewsKeys.id]: string;
  [TheGuardianNewsKeys.webTitle]: string;
  [TheGuardianNewsKeys.webUrl]: string;
  [TheGuardianNewsKeys.apiUrl]: string;
}

export interface TheGuardianNews extends TheGuardianNewsDefault {
  [TheGuardianNewsKeys.type]: string;
  [TheGuardianNewsKeys.sectionId]: string;
  [TheGuardianNewsKeys.sectionName]: string;
  [TheGuardianNewsKeys.webPublicationDate]: string;
  [TheGuardianNewsKeys.isHosted]: string;
  [TheGuardianNewsKeys.pillarId]: string;
  [TheGuardianNewsKeys.pillarName]: string;
}

export interface TheGuardianNewsSections extends TheGuardianNewsDefault {
  [TheGuardianNewsKeys.editions]: TheGuardianNewsDefault[];
}
