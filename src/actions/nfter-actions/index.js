import Parse from 'parse';
import { handleParseError } from '../../utils/error-handling/index';
import {
  GET_NFTR_LOADING,
  GET_NFTR_SUCCESS,
  GET_NFTR_ERROR
} from '../types';

export const getNftr = ({ memer }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NFTR_LOADING,
      payload: {
        loading: true,
      },
    });

    const { data } = await Parse.Cloud.run('get_user', { memer });
    if (data) {
      dispatch({
        type: GET_NFTR_SUCCESS,
        payload: {
          ok: true,
          ...data,
        },
      });
    }
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: GET_NFTR_ERROR,
      payload: {
        error: true,
        code,
        message,
      },
    });
  }
};
