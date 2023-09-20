import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Sushi, SearchsushiParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchsushis = createAsyncThunk<Sushi[], SearchsushiParams>(
  'sushi/fetchsushiStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    
    const { data } = await axios.get<Sushi[]>(`https://6501507e736d26322f5b7c6c.mockapi.io/items`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 4,
          category,
          sortBy,
          order,
          search,
        },
        identity,
      ),
    });

    return data;
  },
);
