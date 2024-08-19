import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiServices from "../../../services/requestHandler";
import {
  Article,
  GetHeadlinesNewsActionPayload,
  GetNewsApiResponse,
  GetNewYorkTimesApiResponse,
  GetSourcesActionPayload,
  GetSourcesApiResponse,
  GetTheGuardianNewsApiResponse,
  GetTheGuardianNewsSectionsApiResponse,
  NewsState,
} from "../../../interfaces/news";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getFullImageUrl,
  normalizeArticles,
  transformNewYorkTimes,
  transformTheGuardian,
} from "../../../utils";

const initialState: NewsState = {
  articles: null,
  news: null,
  newYorkTimes: null,
  theguardianNews: null,
  sources: null,
  newsFeeds: null,
  theGuardianNewsSections: null,
  error: null,
  loading: false,
  newsFeedLoading: false,
  totalResults: 0,
};

export const fetchAllNews: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("news/fetchAllNews", async (args: any, thunkApi) => {
    const {
      params: { newsParams, gaurdianNewsParams, newyorkTimesParams },
    } = args;

    try {
      const [newsApiResponse, newyorkTimesApiResponse, guardianApiResponse]: [
        GetNewsApiResponse,
        GetNewYorkTimesApiResponse,
        GetTheGuardianNewsApiResponse
      ] = await Promise.all([
        apiServices.news(newsParams),
        apiServices.newyorkTimesNews(newyorkTimesParams),
        apiServices.thegaurdianNews(gaurdianNewsParams),
      ]);

      const transformNews: Article[] = newsApiResponse?.data?.articles;

      console.log(newyorkTimesApiResponse);

      const normalizedNYT = normalizeArticles(
        newyorkTimesApiResponse,
        transformNewYorkTimes
      );
      const normalizedGuardian = normalizeArticles(
        guardianApiResponse,
        transformTheGuardian
      );

      const combineArticles = [
        ...(Array.isArray(transformNews) ? transformNews : []),
        ...(Array.isArray(normalizedNYT) ? normalizedNYT : []),
        ...(Array.isArray(normalizedGuardian) ? normalizedGuardian : []),
      ];

      thunkApi.dispatch(setNews(transformNews));
      thunkApi.dispatch(setGuardianNews(transformNews));
      thunkApi.dispatch(setNewYorkTimesNes(transformNews));

      return combineArticles;
    } catch (error: any) {
      // return false;
    }
  });

export const readNews: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/news", async (args, thunkApi) => {
    const { params } = args as any;
    try {
      const response: GetNewsApiResponse = await apiServices.news(params);
      thunkApi.dispatch(setNewsFeeds(response.data.articles));
      return response?.data;
    } catch (e: any) {
      return false;
    }
  });

export const readNewYorkTimesNews: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/newyork-times-news", async (args, thunkApi) => {
    const { params } = args as any;
    try {
      const response: GetNewYorkTimesApiResponse =
        await apiServices.newyorkTimesNews(params);

      const normalizedNYT = normalizeArticles(response, transformNewYorkTimes);
      thunkApi.dispatch(setArticles(normalizedNYT));
      return normalizedNYT;
    } catch (e: any) {
      return false;
    }
  });

export const readGuardianNews: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/guardian-news", async (args, thunkApi) => {
    const { params } = args as any;
    try {
      const response: GetTheGuardianNewsApiResponse =
        await apiServices.thegaurdianNews(params);

      const normalizedGuardian = normalizeArticles(
        response,
        transformTheGuardian
      );
      thunkApi.dispatch(setArticles(normalizedGuardian));
      return normalizedGuardian;
    } catch (e: any) {
      return false;
    }
  });

export const readAllNews: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/readAll-news", async (args, thunkApi) => {
    const { params } = args as any;
    try {
      const response: GetNewsApiResponse = await apiServices.readAllNews(
        params
      );
      return response?.data;
    } catch (e: any) {
      return false;
    }
  });

export const readSources: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/sources", async (args, thunkApi) => {
    try {
      const response: GetSourcesApiResponse = await apiServices.readSources();
      return response?.data;
    } catch (e: any) {
      return false;
    }
  });

export const readNewsFeeds: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/news-feeds", async (args: any, thunkApi) => {
    const { params } = args;
    try {
      const response: GetNewsApiResponse = await apiServices.news(params);
      return response?.data;
    } catch (e: any) {
      return false;
    }
  });

export const readGuardianSections: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/gaurdian-sections", async (args: any, thunkApi) => {
    try {
      const response: GetTheGuardianNewsSectionsApiResponse =
        await apiServices.readGuardianSections();

      return response?.data.response.results;
    } catch (e: any) {
      return false;
    }
  });

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setGuardianNews: (state, action) => {
      state.theguardianNews = action.payload;
    },
    setNewYorkTimesNes: (state, action) => {
      state.newYorkTimes = action.payload;
    },
    setNewsFeeds: (state, action) => {
      state.newsFeeds = action.payload;
    },
    setSources: (state, action) => {
      state.sources = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      readNews.fulfilled,
      (state, action: PayloadAction<GetHeadlinesNewsActionPayload>) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      }
    );
    builder.addCase(readNews.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readNewYorkTimesNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readNewYorkTimesNews.fulfilled, (state, action) => {
      state.loading = false;
      state.newYorkTimes = action.payload;
    });
    builder.addCase(readNewYorkTimesNews.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readGuardianNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readGuardianNews.fulfilled, (state, action) => {
      state.loading = false;
      state.theguardianNews = action.payload;
    });
    builder.addCase(readGuardianNews.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readAllNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      readAllNews.fulfilled,
      (state, action: PayloadAction<GetHeadlinesNewsActionPayload>) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      }
    );
    builder.addCase(readAllNews.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readSources.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      readSources.fulfilled,
      (state, action: PayloadAction<GetSourcesActionPayload>) => {
        state.loading = false;
        state.sources = action.payload.sources;
      }
    );
    builder.addCase(readSources.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readNewsFeeds.pending, (state) => {
      state.newsFeedLoading = true;
    });
    builder.addCase(readNewsFeeds.fulfilled, (state, action) => {
      state.newsFeedLoading = false;
      state.newsFeeds = action.payload.articles;
    });
    builder.addCase(readNewsFeeds.rejected, (state) => {
      state.newsFeedLoading = false;
    });
    builder.addCase(fetchAllNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllNews.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    });
    builder.addCase(fetchAllNews.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readGuardianSections.fulfilled, (state, action) => {
      state.theGuardianNewsSections = action.payload;
    });
  },
});
export default newsSlice.reducer;
export const {
  setArticles,
  setNews,
  setNewsFeeds,
  setError,
  setSources,
  setGuardianNews,
  setNewYorkTimesNes,
} = newsSlice.actions;
