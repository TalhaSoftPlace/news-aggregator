import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiServices from "../../../services/requestHandler";
import {
  GetHeadlinesNewsActionPayload,
  GetHeadlinesNewsPayload,
  GetSourcesActionPayload,
  GetSourcesPayload,
  NewsState,
} from "../../../interfaces/news";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: NewsState = {
  articles: null,
  sources: null,
  error: null,
  loading: false,
  totalResults: 0,
};

export const readTopNews: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/top-news", async (args, thunkApi) => {
    const { params } = args as any;
    try {
      const response: GetHeadlinesNewsPayload = await apiServices.topNews(
        params
      );
      return response?.data;
    } catch (e: any) {
      return false;
    }
  });

export const readAllNews: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/readAll-news", async (args, thunkApi) => {
    const { params } = args as any;
    try {
      const response: GetHeadlinesNewsPayload = await apiServices.readAllNews(
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
      const response: GetSourcesPayload = await apiServices.readSources();
      return response?.data;
    } catch (e: any) {
      return false;
    }
  });

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.articles = action.payload;
    },
    setSources: (state, action) => {
      state.sources = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readTopNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      readTopNews.fulfilled,
      (state, action: PayloadAction<GetHeadlinesNewsActionPayload>) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      }
    );
    builder.addCase(readTopNews.rejected, (state) => {
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
  },
});
export default newsSlice.reducer;
export const { setNews, setError, setSources } = newsSlice.actions;
