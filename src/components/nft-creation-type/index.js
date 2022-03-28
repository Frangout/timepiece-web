import React, { Component } from 'react';
import 'uppy/dist/uppy.css';
import Uppy from '@uppy/core';
// import GoogleDrive from 'uppy/lib/plugins/GoogleDrive';
// // import Dropbox from 'uppy/lib/plugins/Dropbox';
// import Instagram from 'uppy/lib/plugins/Instagram';
import moment from 'moment';
import UppyDashboard from '@uppy/react/lib/Dashboard'
import { Link, withRouter, Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Alert, message, Input, Modal, Divider } from 'antd';
import working from '../../images/placeholders/working.svg';
import AppPlaceholders from '../app-placeholders';
import fetchImage from '../../utils/img-to-blob';
import './css/index.css';
import {
  createNft,
  renderInitialState,
  signTransaction,
  // saveTransactionHash,
  providerInstalled,
  providerNetwork,
  providerUnLocked,
  providerCurrentAccount,
  postReport,
  onReportTextChanged,
} from '../../actions';
import { setTimeout } from 'timers';
import AppLoader from '../app-loader';
import BadMetaMaskNetwork from '../web3-status-fragments/fragments/bad-network';
import NoAccount from '../web3-status-fragments/fragments/no-account';
import NoWallet from '../web3-status-fragments/fragments/no-wallet';
import Parse from 'parse';
import { XRPContext } from '../../context';
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

class NftCreationType extends Component {
  static contextType = XRPContext;
  constructor() {
    super();
    this.state = {
      canAutoCallTransaction: true,
      uploadInProgress: false,
      reportingVisible: false,
    }
  }

  renderReportLayout() {
    return (
      <React.Fragment>
        <br />
        <br />
        <hr />
        <Divider />
        <div className="full-width margin-vertical-large">
          <div className="flex justify-space-between align-items-center">
            <p className="no-margin">Is something going wrong? Report...</p>
            <Button
              type="danger"
              size="large"
              onClick={() => this.setState({ reportingVisible: true })}
            >
            {/* <Icon type="exclamation-circle-o" /> */}
              Report
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentWillMount() {
    const { Client, Wallet } = this.context;

    this.props.providerInstalled();
    this.props.providerNetwork();
    this.props.providerUnLocked();
    this.props.providerCurrentAccount(Wallet.address);
    
    this.uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'image/jpg',
          'image/webp',
          'image/tiff',
          'image/bmp',
          'image/JPEG',
          'image/PNG',
          'image/JPG',
        ],
        maxFileSize: 5000000,
      },
      autoProceed: false,
      id: 'uppy',
      debug: true,
      thumbnailGeneration: false,
    })
      // .use(GoogleDrive, { host: process.env.REACT_APP_UPPY_SERVER })
      // .use(Instagram, { host: process.env.REACT_APP_UPPY_SERVER })
      // .use(Dropbox, { host: process.env.REACT_APP_SERVER.slice(0, -1) })
      .run();

    // this.uppy.on('file-added', () => {
    //   this.props.renderInitialState();
    // });
    
    // this.uppy.on('file-removed', () => {
    //   this.props.renderInitialState();
    // });
  }

  async uploadNft() {
    this.props.renderInitialState();
    const { files } = this.uppy.getState();
    const { length } = Object.keys(files);
    if (!length) {
      message.error('Please upload your dial or a timepiece NFT first');
      return false;
    }
    const [, { data: nft }] = Object.entries(files)[0];
    this.setState({ uploadInProgress: true });

    if (nft.images) {
      const { url: instaLink } = nft.images.standard_resolution;
      const instaBlob = await fetchImage(instaLink);
      this.props.createNft({ meme: instaBlob });
      return true;
    }

    if (nft.webContentLink) {
      const driveBlob = await fetchImage(nft.webContentLink);
      this.props.createNft({ meme: driveBlob });
      return true;
    }
    this.props.createNft({ meme: nft });
  }

  componentWillUnmount() {
    // this.uppy.close();
    this.props.renderInitialState();
  }

  renderDuplicateNfts(duplicates = []) {
    return (
      <div className="duplicate-memes-wrapper inner-duplicate-memes-wrapper">
        {
          duplicates.map(({ memeId, meme: { _url } }) => (
            memeId ? (
              <Link to={`/meme/${memeId}`} target="_blank" key={memeId}>
                <div className="duplicate-meme margin">
                  <img alt="duplicate-memes" src={_url} width={100} height={100} />
                </div>
              </Link>
            ) : (
              <div className="duplicate-meme margin" key={_url}>
                <img alt="duplicate-memes" src={_url} width={100} height={100} />
              </div>
            )
          ))
        }
      </div>
    );
  }

  transactionError() {
    return (
      <React.Fragment>
        <Alert
          message="Transaction failed!"
          description={this.props.meme.success.transaction.errors.message}
          type="error"
          showIcon
          className="full-width"
        />

      <div
        className="full-width margin-vertical-large"
      >
        <Button
          type="default"
          size="large"
          onClick={() => {
            const { Client, Wallet } = this.context;
            this.props.signTransaction({
              client: Client,
              wallet: Wallet,
              url: process.env.REACT_APP_SERVER + process.env.REACT_APP_SERVER_PARSE + 'nft/' + this.props.meme.success.dId,
              hash: this.props.meme.success.hash,
              dId: this.props.meme.success.dId,
              value: this.props.meme.success.value,
              loader: true
            })
          }}
        >
          Try again
        </Button>
      </div>
      
      { this.renderReportLayout() }
      </React.Fragment>
    )
  }

  renderInfo() {
    const renderLoading = () => (
      <React.Fragment>
        <AppLoader />
        <p>Your NFT is being validated.</p>
        <p>Please wait ...</p>
      </React.Fragment>
    );

    const renderUpload = () => (
      <AppPlaceholders
        src={working}
        upper="Upload your timepice NFT to proceed..."
        className="full-width"
      />
    );

    const errorMessage = () => (
      <div
        className="full-width margin-vertical-large"
      >
        <Alert
          message="Error!"
          description={this.props.meme.errors.message}
          type="error"
          showIcon
          className="full-width"
        />
        <div
          className="full-width margin-vertical-large"
        >
         <Button
          type="default"
          size="large"
          onClick={this.uploadNft.bind(this)}
          >
            Try again
          </Button>
        </div>

        { this.renderReportLayout() }
      </div>
     
    );

    if (this.props.meme.loading) {
      return renderLoading();
    } else {
      if (this.props.meme.errors.error) {
        return errorMessage();
      } else if (this.props.meme.success.ok) {
        if (this.props.meme.success.duplicate && !this.props.meme.success.valid) {
          return this.renderDuplicateStatus();
        } else if (!this.props.meme.success.duplicate && this.props.meme.success.valid) {
          if (this.props.meme.success.transaction.loading) {
            return this.renderNftValidFragment();
          } else {
            if (this.props.meme.success.transaction.success.ok) {
              return this.renderNftSavedFragment();
            } else if (this.props.meme.success.transaction.errors.error) {
              return this.transactionError();
            }
          }
        }
      }
      return renderUpload();
    }
  }

  renderNftSavedFragment() {
    this.uppy.reset();
    return (
      <React.Fragment>
        <Alert
          message="Success! You own it!"
          description={
            <React.Fragment>
              <span>Now, thats what we call a creative original NFT!</span><br />
              <span>
                Visit your <Link to="/my-nfts/all"> NFTs </Link> page to look at your shiny new NFT.
              </span>
            </React.Fragment>
          }
          type="success"
          className="full-width margin-vertical-large"
          showIcon
        />
        {/* <div className="owned-meme-wrapper margin-vertical-large full-width full-height">
          <Link to={`/meme/${this.props.meme.success.transaction.success.txhash.success.memeId}`}>
              <div className="owned-meme-info">
                <span>
                  <Icon type="smile-o" /> &nbsp;
                  {this.props.meme.success.transaction.success.txhash.success.memer}
                  &nbsp; 
                </span>
              
                <span>
                  &nbsp;
                  <Icon type="clock-circle-o" /> 
                  &nbsp;
                  {
                    moment().fromNow(this.props.meme.success.transaction.success.txhash.success.createdAt)
                  }
                </span>
              </div>
              <img
                alt="meme"
                src={this.props.meme.success.transaction.success.txhash.success.meme._url}
                className="full-width full-height"
              />
            </Link>
          </div> */}
      </React.Fragment>
    )
  }

  // renderSaveTransactionHashFragment() {

  //   return (
  //     <React.Fragment>
  //       <Alert
  //         message="Nft transaction complete!"
  //         description="Saving your meme..."
  //         type="info"
  //         className="full-width"
  //         showIcon
  //       />
  //       <div className="margin-vertical-large">
  //         <AppLoader />
  //       </div>
  //     </React.Fragment>
  //   );
  
  // }

  renderNftValidFragment() {
    setTimeout(async () => {
      const { Client, Wallet } = this.context;
      this.props.signTransaction({
        client: Client,
        wallet: Wallet,
        url: process.env.REACT_APP_SERVER + process.env.REACT_APP_SERVER_PARSE + 'nft/' + this.props.meme.success.dId,
        hash: this.props.meme.success.hash,
        dId: this.props.meme.success.dId,
        value: this.props.meme.success.value,
      });
  });
      
    return (
      <React.Fragment>
        <Alert
          message="Your NFT dial is one of a kind!"
          description={
            <React.Fragment>
              <ul style={{ paddingLeft: 0 }}>
                <li>Confirm the transaction to own this NFT.</li>
                <li>After signing, it might take upto 5 seconds to process... Hope no one beats you to it!</li>
                <li>If the TX price is high, reject the transaction and try again.</li>
                <li>Check out prices at: 
                   <a
                    href="https://xrpl.org/transaction-cost.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    XRP TX Cost
                  </a>
                  .
                </li>
              </ul>
            </React.Fragment>
          }
          type="info"
          className="full-width"
          showIcon
        />
        <div className="margin-vertical-large">
          <AppLoader />
        </div>
      </React.Fragment>
    );
  }
  
  renderDuplicateStatus() {
    return (
      <div className="memes-error-wrapper">
        <div className="duplicate-memes-wrapper">
          <div className="full-width">
            <Alert
              description="Oh! This NFT is already taken or there are similar NFT like yours"
              type="error"
              showIcon
              className="app-no-ant-alert-header"
            />
            <hr style={{ 'marginTop': '1.2em', 'marginBottom': '-0.6em'}} />
          </div>
          { this.renderDuplicateNfts(this.props.meme.success.memes) }
          <div className="full-width">
            <hr style={{ 'marginTop': '-0.4em', 'marginBottom': '1.2em'}} />
            <div className="report-meme-wrapper">
              <p>Err? No my NFT is unique!</p>
              <Button
                type="danger"
                size="large"
                onClick={() => this.setState({ reportingVisible: true })}
              >
              {/* <Icon type="exclamation-circle-o" /> */}
                Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCreatePage() {
    return (
      <React.Fragment>
        <div className="meme-creation-type-wrapper padding-large">
          <div className="uppy-uploader-wrapper">
            <UppyDashboard
              uppy={this.uppy}
              plugins={[]}
              hideUploadButton
              maxHeight={420}
            />
            <Button
              className="app-primary-large done-uploading-meme margin-vertical-medium"
              type="primary"
              size="large"
              onClick={this.uploadNft.bind(this)}
              loading={
                this.props.meme.loading || 
                (this.props.meme.success.transaction.loading && !this.props.meme.success.duplicate)
              }
            >
              Own This NFT <span role="img" aria-label="Go">👍🏻</span>
            </Button>
          </div>
          <div className="create-meme-info">
            { this.renderInfo() }
          </div>
        </div>
        <Prompt
          when={this.state.uploadInProgress && !this.props.meme.success.transaction.success}
          message={location => (
            `Your meme will not be saved or owned by you if you quit.
            `
          )}
        />
        <Modal
          title="Report"
          visible={this.state.reportingVisible}
          onOk={this.submitReport}
          confirmLoading={this.props.report.loading}
          onCancel={() => this.setState({ reportingVisible: false })}
          className="report-modal"
        >
          <p>Please add your query / complaint below.</p>
          <Input
            type="textarea"
            placeholder="What difficulties are you facing?"
            onChange={this.onReportTextChanged}
            value={this.props.report.text}
          />
          <p className="report-info">
            Other data including transaction hash and your NFT (if any) are 
            included with this report.
          </p>

        </Modal>
      </React.Fragment>
    );
  }

  onReportTextChanged = ({ target }) => {
    this.props.onReportTextChanged(target.value); 
  }

  submitReport = async () => {
    try {
      const { files } = this.uppy.getState();

      const getFile = () => {
        const { length } = Object.keys(files);
        if (length) {
          const [, { data: meme }] = Object.entries(files)[0];
          return new Parse.File('reported_meme', meme);
        }
      };
      const meme = getFile();
      await this.props.postReport({
        report: this.props.report.text,
        meme,
        data: this.props.meme
      });
      this.setState({ uploadInProgress: false });
      this.setState({ reportingVisible: false });
      message.success("Your report has been posted. You may now exit from this page or try owning other memes!");

    } catch (e) {
      message.error('Error posting your report. Please try again');
    }
  }

  render() {
    if (this.props.web3.loading) {
      return (
        <div className="center-flex margin-large align-center">
          <AppLoader />
        </div>
      );
    } else {
      if (!this.props.web3.installed) {
        return <NoWallet />;
      } else if (!this.props.web3.unlocked) {
        return <NoAccount />;
      } 
			else if (!this.props.web3.network) {
        return <BadMetaMaskNetwork network="" />;
      } 
			else {
        if (this.props.web3.account) {
          return this.renderCreatePage();
        } else {
          return <NoAccount />;
        }
      }
    }
  }
}

const mapStateToProps = ({ memeCreationReducers, web3Reducers, reportReducers }) => {
  const { meme } = memeCreationReducers;
  const { web3 } = web3Reducers;
  const { report } = reportReducers;
  return { meme, web3, report };
};

export default withRouter(connect(mapStateToProps, {
  createNft,
  renderInitialState,
  signTransaction,
  // saveTransactionHash,
  providerInstalled,
  providerNetwork,
  providerUnLocked,
  providerCurrentAccount,
  postReport,
  onReportTextChanged,
})(NftCreationType));
