import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '../../types/api';
import Urls from '../../common/Urls';

// 요청에 필요한 파라미터 타입 정의
export interface FetchFixtureListParams {
  leagueId: number;
  date: string;
}

export interface FixtureListItemResponse {
  matchSchedule: {
    kickoff: string;
    round: string;
  };
  teamALogo: {
    name: string;
    logo: string;
    koreanName: string | null;
  };
  teamBLogo: {
    name: string;
    logo: string;
    koreanName: string | null;
  };
  status: {
    longStatus: string;
    shortStatus: string;
    elapsed: number | null;
    score: {
      home: number;
      away: number;
    };
  };
}

const fetchFixtureList = createAsyncThunk<
  ApiResponse<FixtureListItemResponse>, // 성공 시 반환 타입
  FetchFixtureListParams // 입력 파라미터 타입
>(
  'fixtureList/fetchFixtureList',
  async ({ leagueId, date }, { rejectWithValue }) => {
    try {
      let response: AxiosResponse<ApiResponse<FixtureListItemResponse>>;
      if (date === '' || date === null || date === undefined) {
        response = await axios.get<ApiResponse<FixtureListItemResponse>>(
          Urls.apiUrl + Urls.football.fixturesOnDate,
          {
            params: { leagueId, date },
          },
        );
      } else {
        response = await axios.get<ApiResponse<FixtureListItemResponse>>(
          Urls.apiUrl + Urls.football.fixtures,
          {
            params: { leagueId },
          },
        );
      }

      if (
        response.data.response === null ||
        response.data.metaData?.responseCode !== 200
      ) {
        return rejectWithValue(response.data.metaData);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);
export default fetchFixtureList;
