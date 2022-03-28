import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { withRouter, Link, Route } from 'react-router-dom';
import NftrInfo from '../../components/nfter-info';
import UserNfts from '../../components/user-nfts';
import SellingNfts from '../../components/selling-nfts';
import './css/index.css';
import {
  getCurrentUser,
} from '../../actions';


class Nftr extends Component {

  state = {
    memer: '',
    currentTab: '1',
    memerAllNftsPathName: /^\/my-nfts\/all\/?/,
    memerSellNftsPathName: /^\/my-nfts\/sale\/?/,
  }

  componentWillMount() {
    this.highlightTab(this.props);
    this.props.getCurrentUser();
  }

  highlightTab(props) {
    const { location } = props;
    if (this.state.memerAllNftsPathName.test(location.pathname)) {
      this.setState({ currentTab: '1' });
    } else if (this.state.memerSellNftsPathName.test(location.pathname)) {
      this.setState({ currentTab: '2' });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.highlightTab(nextProps);
    if (nextProps.currentUser) {
      this.setState({ memer: nextProps.currentUser.memer });
    }
  }

  renderNftr() {
    return <NftrInfo memerName={this.state.memer} {...this.props} />;
  }

  renderNftrNfts() {
    return (
      <Tabs activeKey={this.state.currentTab} className="memer-tabs">
        <Tabs.TabPane
          tab={
            <Link to="/my-nfts/all" className="tab-link">
              All
            </Link>
          } key="1"
        >
          <Route
            path={`/my-nfts/all/:page?`}
            component={UserNfts}
            {...this.props}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <Link to="/my-nfts/sale" className="tab-link">
              Selling
            </Link>
          }
          key="2"
        >
          <Route
            path={`/my-nfts/sale/:page?`}
            component={SellingNfts}
            {...this.props}
          />
        </Tabs.TabPane>
      </Tabs>
    );
  }

  render() {
    if (this.state.memer) {
      return (
        <div className="memer-page">
          { this.renderNftr() }
          { this.renderNftrNfts() }
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = ({ parseReducers }) => {
  const { currentUser } = parseReducers;
  return { currentUser };
};

export default withRouter(connect(mapStateToProps, {
  getCurrentUser,
})(Nftr));
