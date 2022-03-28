import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getAuctions, getCurrentUser } from '../../actions';
import './css/index.css';
import NftsList from '../nfts-list';
import { Button, Alert } from 'antd';
import news from '../../images/placeholders/news.svg';
import AppPlaceholders from '../app-placeholders';
import { getOffset } from '../../utils/pagination-utils';


class SellingNfts extends Component {

  state = {
    memer: '',
    currentPage: 0,
    profilePathName: /^\/profile\/[a-zA-Z0-9_]+\/sale\/?/,
    myNftsPathName: /^\/my-nfts\/sale\/?/,
    hardRefresh: false,
  };

  componentWillMount() {
    this.setState({ currentPage: this.getPageFromProps(this.props) });
  }

  componentDidMount() {
    this.getNftsBeingSoldByUser({ offset: getOffset(this.getPageFromProps(this.props)) });
  }

  getPageFromProps(props) {
    const { match } = props;
    const page = match && match.params.page ? +match.params.page : 1;
    return page;
  }

  getNftsBeingSoldByUser({ offset } = {}) {
    const { location } = this.props;
    if (this.state.myNftsPathName.test(location.pathname)) {
      const { payload: { memer } } = this.props.getCurrentUser();
      this.props.getAuctions({ memer, offset });
    } else if (this.state.profilePathName.test(location.pathname)) {
      this.setState({ memer: this.props.profile });
      this.props.getAuctions({ memer: this.props.profile, offset });
    }
  }

  onPaginationChange({ page }) {
    const { location } = this.props;
    if (this.state.myNftsPathName.test(location.pathname)) {
      this.props.history.push(`/my-nfts/sale/${page}`);
    } else if (this.state.profilePathName.test(location.pathname)) {
      this.props.history.push(`/profile/${this.props.profile}/sale/${page}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const page = this.getPageFromProps(nextProps);
    if (this.state.hardRefresh || this.state.currentPage !== page) {
      this.getNftsBeingSoldByUser({ offset: getOffset(page) });
      this.setState({ currentPage: page, hardRefresh: false });
    }
    
    // this.props.getAuctions({ offset });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props.auctions) !== JSON.stringify(nextProps.auctions) || JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  handleErrorAndReset(cb) {
    const { location } = this.props;
    if (this.state.myNftsPathName.test(location.pathname)) {
      this.props.history.push('/my-nfts/sale/1');
    } else if (this.state.profilePathName.test(location.pathname)) {
      this.props.history.push(`/profile/${this.props.profile}/sale/1`);
    }
    this.setState({ hardRefresh: true });
    cb();
  }

  noNftsMessage() {
    return (
      <AppPlaceholders
        src={news}
        upper="There are no NFTs on auction here.."
        lower="Get started! Put your NFTs up for auction"
      >
        <Link to={`/my-nfts/all`}>
          <Button
            type="primary"
            size="large"
            className="app-primary-large"
          >
          Auction NFTs
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
          description={this.props.auctions.errors.message}
          type="error"
          showIcon
        />
        <div
          className="margin-vertical-large"
        >
          <Button
            type="default"
            size="large"
            onClick={() => this.handleErrorAndReset(cb) }
          >
            Try again
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <NftsList
        memes={this.props.auctions}
        noNftsMessage={this.noNftsMessage.bind(this)}
        memesErrorMessage={this.memesErrorMessage.bind(this)}
        onPaginationChange={this.onPaginationChange.bind(this)}
      />
    );
  }
}

const mapStateToProps = ({ auctionReducers, parseReducers }) => {
  const { auctions } = auctionReducers;
  const { currentUser } = parseReducers;
  return { auctions, currentUser };
};

export default withRouter(connect(mapStateToProps, {
  getAuctions,
  getCurrentUser,
})(SellingNfts));
