import {
  GET_NFTR_LOADING,
  GET_NFTR_SUCCESS,
  GET_NFTR_ERROR,
  NFTR_NFTS_COUNT,
} from '../../actions/types';

const INITIAL_STATE = {
  memer: {
    loading: true,
    success: {
      ok: false,
    },
    errors: {
      error: false,
      message: '',
    }
  },
  ownedNftCount: 0,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_NFTR_LOADING:
      return {
        ...state,
        memer: {
          ...state.memer,
          loading: true,
        }
      };
    case GET_NFTR_SUCCESS:
      return {
        ...state,
        memer: {
          ...state.memer,
          loading: false,
          success: {
            ...state.memer.success,
            ...payload,
          }
        }
      };
    case GET_NFTR_ERROR:
      return {
        ...state,
        memer: {
          ...state.memer,
          loading: false,
          errors: {
            ...state.memer.errors,
            ...payload,
          }
        }
      }
    
    case NFTR_NFTS_COUNT:
      return {
        ...state,
        ownedNftCount: payload,
      }
    default:
      return { ...state };
  }
};

