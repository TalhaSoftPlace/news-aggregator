import { GlobalKeys } from "../types/global";
import { ArticlesKeys, NewsKeys, SourceKeys } from "../types/news";

export interface NewsState {
  [GlobalKeys.Loading]: boolean;
  [GlobalKeys.Error]: string | null;
  [ArticlesKeys.articles]: Article[] | null;
  [GlobalKeys.totalResults]: number;
  [SourceKeys.sources]: Sources[] | null;
}

export interface SourceResponse {
  [SourceKeys.id]: string;
  [SourceKeys.name]: string;
}

export interface Article {
  [SourceKeys.source]: SourceResponse;
  [ArticlesKeys.author]: string;
  [ArticlesKeys.title]: string;
  [ArticlesKeys.description]: string;
  [ArticlesKeys.url]: string;
  [ArticlesKeys.urlToImage]: string;
  [ArticlesKeys.publishedAt]: string;
  [ArticlesKeys.content]: string;
}

export interface ArticlesResponse {
  [ArticlesKeys.articles]: Article[];
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
  [SourceKeys.sources]: Sources[];
}

export interface GetHeadlinesNewsPayload {
  [GlobalKeys.data]: {
    [GlobalKeys.status]: string;
    [GlobalKeys.totalResults]: number;
    [ArticlesKeys.articles]: Article[];
  };
}
export interface GetSourcesPayload {
  [GlobalKeys.data]: {
    [GlobalKeys.status]: string;
    [SourceKeys.sources]: Sources[];
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
  category: string;
  country: string;
  sources: string;
  from: string;
  to: string;
}