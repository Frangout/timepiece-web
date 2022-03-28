import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getNfts, getCurrentUser } from '../../actions';
import NftsList from '../nfts-list';
import { Button, Alert } from 'antd';
import AppPlaceholders from '../app-placeholders';
import noData from '../../images/placeholders/no_data.svg';
import { getOffset } from '../../utils/pagination-utils';
import { XRPContext } from '../../context';


class UserNfts extends Component {
  static contextType = XRPContext;

  state = {
    memer: '',
    currentPage: 0,
    profilePathName: /^\/profile\/[a-zA-Z0-9_]+\/all\/?/,
    myNftsPathName: /^\/my-nfts\/all\/?/,
    hardRefresh: false,
  };

  getPageFromProps(props) {
    const { match } = props;
    const page = match && match.params.page ? +match.params.page : 1;
    return page;
  }

  componentWillMount() {
    this.setState({ currentPage: this.getPageFromProps(this.props) });
  }

  componentDidMount() {
    this.getUsersNfts({ offset: getOffset(this.getPageFromProps(this.props)) });
  }

  getUsersNfts({ offset } = {}) {
    const { location } = this.props;
    const { Wallet } = this.context;

    if (this.state.myNftsPathName.test(location.pathname)) {
      const { payload: { memer } } = this.props.getCurrentUser();
      this.props.getNfts({ memer, offset, account: Wallet.classicAddress });
    } else if (this.state.profilePathName.test(location.pathname)) {
      this.setState({ memer: this.props.profile });
      this.props.getNfts({ memer: this.props.profile, offset, account: Wallet.classicAddress });
    }
  }

  onPaginationChange({ page }) {
    const { location } = this.props;
    if (this.state.myNftsPathName.test(location.pathname)) {
      this.props.history.push(`/my-nfts/all/${page}`);
    } else if (this.state.profilePathName.test(location.pathname)) {
      this.props.history.push(`/profile/${this.props.profile}/all/${page}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const page = this.getPageFromProps(nextProps);
    if (this.state.hardRefresh || this.state.currentPage !== page) {
      this.getUsersNfts({ offset: getOffset(page) });
      this.setState({ currentPage: page, hardRefresh: false });
    }
    
    // this.props.getAuctions({ offset });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props.memes) !== JSON.stringify(nextProps.memes) || JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  handleErrorAndReset(cb) {
    const { location } = this.props;
    if (this.state.myNftsPathName.test(location.pathname)) {
      this.props.history.push('/my-nfts/all/1');
    } else if (this.state.profilePathName.test(location.pathname)) {
      this.props.history.push(`/profile/${this.props.profile}/all/1`);
    }
    this.setState({ hardRefresh: true });
    cb();
  }

  noNftsMessage() {
    return (
      <AppPlaceholders
        src={noData}
        upper="No memes owned yet!"
        lower="Own your most creative memes for free.."
      >
        <Link to={`/create`}>
          <Button
            type="primary"
            size="large"
            className="app-primary-large"
          >
          Own a meme
          </Button>
        </Link>
      </AppPlaceholders>
    );
  }

  memesErrorMessage(cb) {
    return (
      <div className="error-wrapper">
        <Alert
          message="Error!"
          description={this.props.memes.errors.message}
          type="error"
          showIcon
        />
        <div
          className="margin-vertical-large"
        >
          <Button
            type="default"
            size="large"
            onClick={() => this.handleErrorAndReset(cb)}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <React.Fragment>
        <NftsList
          memes={this.props.memes}
          noNftsMessage={this.noNftsMessage.bind(this)}
          memesErrorMessage={this.memesErrorMessage.bind(this)}
          onPaginationChange={this.onPaginationChange.bind(this)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ memesReducers }) => {
  const { memes } = memesReducers;
  return { memes };
};

export default withRouter(connect(mapStateToProps, {
  getNfts,
  getCurrentUser,
})(UserNfts));
