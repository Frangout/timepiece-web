import Parse from 'parse';
import {
  CREATE_NFT_LOADING,
  CREATE_NFT_SUCCESS,
  CREATE_NFT_ERROR,
  RENDER_INITIAL_STATE,
  CREATE_NFT_TRANSACTION_LOADING,
  CREATE_NFT_TRANSACTION_ERROR,
  CREATE_NFT_TRANSACTION_SUCCESS,
  CREATE_NFT_TRANSACTION_HASH_LOADING,
  CREATE_NFT_TRANSACTION_HASH_SUCCESS,
  CREATE_NFT_TRANSACTION_HASH_ERROR,
} from '../types';
import { message as antdMessage } from 'antd';
import toBase64 from '../../utils/to-base-64';
import { handleParseError } from '../../utils/error-handling/index';
import NftsChainCore from '../../eth-build/meme';
import web3 from '../../utils/web3/index';
// import { providerCurrentAccount } from '../web3-actions';
import { getCurrentUser } from '../parse-actions';
import { providerNetwork, providerInstalled } from '../web3-actions';
const xrpl = require('xrpl');

export const createNft = ({ meme }) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_NFT_LOADING, payload: {} });
    const blob = await toBase64(meme);
    const { data } = await Parse.Cloud.run('post_meme', { meme: blob });
    if (data) {
      dispatch({
        type: CREATE_NFT_SUCCESS,
        payload: {
          success: {
            ok: true,
            ...data,
          },
        },
      });
    } else {
      dispatch({
        type: CREATE_NFT_SUCCESS,
        payload: {
          success: {
            ...data,
            ok: false,
          },
        },
      });
    }
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: CREATE_NFT_ERROR,
      payload: {
        errors: {
          error: true,
          code,
          message,
        },
      },
    });
  }
};

export const signTransaction = ({ wallet, client, url = '', account, hash, dId, loader = false, value = 0 }) => async (dispatch) =>  {

  if (hash && dId) {
    try {
      if (loader) {
        dispatch({
          type: CREATE_NFT_TRANSACTION_LOADING,
          payload: {},
        });
      }

      const transactionBlob = {
        TransactionType: "NFTokenMint",
        Account: wallet.classicAddress,
        URI: xrpl.convertStringToHex(url),
        Flags: 8,
        TokenTaxon: 0
      }

      const tx = await client.submitAndWait(transactionBlob,{wallet})

      const nfts = await client.request({
        method: "account_nfts",
        account: wallet.classicAddress
      })
      console.log(tx)
       dispatch({
        type: CREATE_NFT_TRANSACTION_SUCCESS,
        payload: {
          success: {
            ok: true,
            txHash: tx.result.hash,
            memeId: tx.id,
            ...tx,
          },
        },
      });
    } catch (e) {
      console.error(e)
      dispatch({
        type: CREATE_NFT_TRANSACTION_ERROR,
        payload: {
          errors: {
            error: true,
            message: ''//message.split('\n')[0],
          },
        },
      });
    }
  }
};

// export const saveTransactionHash = ({ txHash, dId, memeId }) => async (dispatch) => {
//   try {
//     dispatch({ type: CREATE_NFT_TRANSACTION_HASH_LOADING, paylaod: {} });
//     const { data } = await Parse.Cloud.run('put_meme', { txHash, dId, memeId });
//     if (data) {
//       dispatch({
//         type: CREATE_NFT_TRANSACTION_HASH_SUCCESS,
//         payload: {
//           success: {
//             ok: true,
//             ...data,
//           },
//         },
//       });
//     }
//   } catch (e) {
//     const { code, message } = handleParseError(e);
//     dispatch({
//       type: CREATE_NFT_TRANSACTION_HASH_ERROR,
//       payload: {
//         errors: {
//           error: true,
//           code,
//           message,
//         },
//       },
//     });
//   }
// };

export const renderInitialState = () => ({ type: RENDER_INITIAL_STATE, payload: {} });
