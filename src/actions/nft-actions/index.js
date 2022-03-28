import Parse from 'parse';
import { handleParseError } from '../../utils/error-handling/index';
import {
  GET_NFTS_LOADING,
  GET_NFTS_SUCCESS,
  GET_NFTS_ERROR,
  NFTR_NFTS_COUNT,
} from '../types';

export const getNfts = ({ memer, offset = 0, account } = {}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NFTS_LOADING,
      payload: {
        loading: true,
      },
    });

    const { data: { result = [], total } } = await Parse.Cloud.run('get_memes', { account, memer, offset, order: 'desc' });
    dispatch({
      type: GET_NFTS_SUCCESS,
      payload: {
        result,
        total,
      },
    });

    dispatch({
      type: NFTR_NFTS_COUNT,
      payload: total,
    });
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: GET_NFTS_ERROR,
      payload: {
        error: true,
        code,
        message,
      },
    });
  }
};
