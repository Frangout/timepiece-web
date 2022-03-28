import {
  AUCTION_LOADING,
  AUCTION_ERROR,
  AUCTION_SUCCESS,
  GET_PRICE_LOADING,
  GET_PRICE_ERROR,
  GET_PRICE_SUCCESS,
  CREATE_NFT_AUCTION_LOADING,
  CREATE_NFT_AUCTION_SUCCESS,
  CREATE_NFT_AUCTION_ERROR,
  CANCEL_NFT_AUCTION_LOADING,
  CANCEL_NFT_AUCTION_SUCCESS,
  CANCEL_NFT_AUCTION_ERROR,
  AUCTION_DETAILS_INITIAL_STATE,
  BUY_NFT_FROM_AUCTION_LOADING,
  BUY_NFT_FROM_AUCTION_SUCCESS,
  BUY_NFT_FROM_AUCTION_ERROR,
} from '../../actions/types';
  
const INITIAL_STATE = {
  auctions: {
    loading: false,
    success: {
      ok: false,
      data: [],
      total: 0,
    },
    errors: {
      error: false,
      message: '',
    },
  },
  auctionPrice: {
    loading: false,
    success: {
      ok: false,
      data: 0,
    },
    errors: {
      error: false,
      message: '',
    },
  },
  createNftAuction: {
    loading: false,
    success: {
      ok: false,
      data: null,
    },
    errors: {
      error: false,
      message: '',
    },
  },
  cancelNftAuction: {
    loading: false,
    success: {
      ok: false,
      data: null,
    },
    errors: {
      error: false,
      message: '',
    },
  },
  buyNftFromAuction: {
    loading: false,
    success: {
      ok: false,
      data: null,
    },
    errors: {
      error: false,
      message: '',
    },
  },
};
  
export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AUCTION_LOADING:
      return {
        ...state,
        auctions: {
          ...state.auctions,
          loading: true,
        },
        success: {
          ...state.auctions.success,
          ...INITIAL_STATE.auctions.success,
        },
        errors: {
          ...state.auctions.errors,
          ...INITIAL_STATE.auctions.errors,
        },
      };
    case AUCTION_ERROR:
      return {
        ...state,
        auctions: {
          ...state.auctions,
          loading: false,
          success: {
            ...state.auctions.success,
            ok: false,
          },
          errors: {
            ...state.auctions.errors,
            error: true,
            message: payload.message,
          },
        },
      };
    case AUCTION_SUCCESS:
      return {
        ...state,
        auctions: {
          ...state.auctions,
          loading: false,
          errors: {
            ...state.auctions.errors,
            error: false,
          },
          success: {
            ...state.auctions.success,
            ok: true,
            data: payload.result,
            total: payload.total,
          },
        },
      };
    case GET_PRICE_LOADING:
      return {
        ...state,
        auctionPrice: {
          ...state.auctionPrice,
          loading: true,
        },
      };
    case GET_PRICE_ERROR:
      return {
        ...state,
        auctionPrice: {
          ...state.auctionPrice,
          loading: false,
          success: {
            ...state.auctionPrice.success,
            ok: false,
          },
          errors: {
            ...state.auctionPrice.errors,
            error: true,
            message: payload.message,
          },
        },
      };
    case GET_PRICE_SUCCESS:
      return {
        ...state,
        auctionPrice: {
          ...state.auctionPrice,
          loading: false,
          success: {
            ...state.auctionPrice.success,
            ok: true,
            data: payload,
          },
        },
      };
    
    case CREATE_NFT_AUCTION_LOADING:
      return {
        ...state,
        createNftAuction: {
          ...state.createNftAuction,
          loading: true,
          success: {
            ...state.createNftAuction.success,
            ok: false,
          },
          errors: {
            ...state.createNftAuction.errors,
            error: false,
          },
        },
      };

    case CREATE_NFT_AUCTION_ERROR:
      return {
        ...state,
        createNftAuction: {
          ...state.createNftAuction,
          loading: false,
          success: {
            ...state.createNftAuction.success,
            ok: false,
          },
          errors: {
            ...state.createNftAuction.errors,
            error: true,
            message: payload.message,
          },
        },
      };
    
    case CREATE_NFT_AUCTION_SUCCESS:
      return {
        ...state,
        createNftAuction: {
          ...state.createNftAuction,
          loading: false,
          success: {
            ...state.createNftAuction.success,
            ok: true,
            data: true,
          },
          errors: {
            ...state.createNftAuction.errors,
            error: false,
          },
        },
      };


    case CANCEL_NFT_AUCTION_LOADING:
      return {
        ...state,
        cancelNftAuction: {
          ...state.cancelNftAuction,
          loading: true,
          success: {
            ...state.cancelNftAuction.success,
            ok: false,
          },
          errors: {
            ...state.cancelNftAuction.errors,
            error: false,
          },
        },
      };

    case CANCEL_NFT_AUCTION_ERROR:
      return {
        ...state,
        cancelNftAuction: {
          ...state.cancelNftAuction,
          loading: false,
          success: {
            ...state.cancelNftAuction.success,
            ok: false,
          },
          errors: {
            ...state.cancelNftAuction.errors,
            error: true,
            message: payload.message,
          },
        },
      };
    
    case CANCEL_NFT_AUCTION_SUCCESS:
      return {
        ...state,
        cancelNftAuction: {
          ...state.cancelNftAuction,
          loading: false,
          success: {
            ...state.cancelNftAuction.success,
            ok: true,
            data: true,
          },
          errors: {
            ...state.cancelNftAuction.errors,
            error: false,
          },
        },
      };

    
    case BUY_NFT_FROM_AUCTION_LOADING:
      return {
        ...state,
        buyNftFromAuction: {
          ...state.buyNftFromAuction,
          loading: true,
          success: {
            ...state.buyNftFromAuction.success,
            ok: false,
          },
          errors: {
            ...state.buyNftFromAuction.errors,
            error: false,
          },
        },
      };
    
    case BUY_NFT_FROM_AUCTION_ERROR:
      return {
        ...state,
        buyNftFromAuction: {
          ...state.buyNftFromAuction,
          loading: false,
          success: {
            ...state.buyNftFromAuction.success,
            ok: false,
          },
          errors: {
            ...state.buyNftFromAuction.errors,
            error: true,
            message: payload.message,
          },
        },
      };
    
    case BUY_NFT_FROM_AUCTION_SUCCESS:
      return {
        ...state,
        buyNftFromAuction: {
          ...state.buyNftFromAuction,
          loading: false,
          success: {
            ...state.buyNftFromAuction.success,
            ok: true,
            data: true,
          },
          errors: {
            ...state.buyNftFromAuction.errors,
            error: false,
          },
        },
      };


    case AUCTION_DETAILS_INITIAL_STATE:
      return {
        ...state,
        createNftAuction: {
          ...state.createNftAuction,
          ...INITIAL_STATE.createNftAuction,
        },
        cancelNftAuction: {
          ...state.cancelNftAuction,
          ...INITIAL_STATE.cancelNftAuction,
        },
        buyNftFromAuction: {
          ...state.buyNftFromAuction,
          ...INITIAL_STATE.buyNftFromAuction,
        },
        auctionPrice: {
          ...state.auctionPrice,
          ...INITIAL_STATE.auctionPrice,
        },
      };
    default:
      return { ...state };
  }
};
