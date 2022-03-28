import Parse from 'parse';
import { handleParseError } from '../../utils/error-handling/index';
import {
  GET_NFT_LOADING,
  GET_NFT_SUCCESS,
  GET_NFT_ERROR,
  GET_NFT_INITIAL_STATE,
} from '../types';

export const getNft = ({ meme }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NFT_LOADING,
      payload: {
        loading: true,
      },
    });

    const { data } = await Parse.Cloud.run('get_meme', { meme });
    if (data) {
      dispatch({
        type: GET_NFT_SUCCESS,
        payload: {
          ok: true,
          ...data,
        },
      });
    }
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: GET_NFT_ERROR,
      payload: {
        error: true,
        code,
        message,
      },
    });
  }
};

export const getNftInitialState = () => ({ type: GET_NFT_INITIAL_STATE, payload: {} });
