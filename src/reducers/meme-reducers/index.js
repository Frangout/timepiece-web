import {
  GET_NFT_LOADING,
  GET_NFT_SUCCESS,
  GET_NFT_ERROR,
  GET_NFT_INITIAL_STATE,
} from '../../actions/types';

const INITIAL_STATE = {
  meme: {
    loading: true,
    success: {
      ok: false,
    },
    errors: {
      error: false,
      message: '',
    }
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_NFT_LOADING:
      return {
        ...state,
        meme: {
          ...state.meme,
          loading: true,
        }
      };
    case GET_NFT_SUCCESS:
      return {
        ...state,
        meme: {
          ...state.meme,
          loading: false,
          success: {
            ...state.meme.success,
            ...payload,
          }
        }
      };
    case GET_NFT_ERROR:
      return {
        ...state,
        meme: {
          ...state.meme,
          loading: false,
          errors: {
            ...state.meme.errors,
            ...payload,
          }
        }
      }
    case GET_NFT_INITIAL_STATE:
      return { ...INITIAL_STATE };
    default:
      return { ...state };
  }
};

