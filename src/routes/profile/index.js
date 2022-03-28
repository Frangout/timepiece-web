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


class Profile extends Component {

  state = {
    currentTab: '1',
    profileAllNftsPathName: /^\/profile\/[a-zA-Z0-9_]+\/all\/?/,
    profileSellNftsPathName: /^\/profile\/[a-zA-Z0-9_]+\/sale\/?/,
  }

  componentWillMount() {
    const { location } = this.props;
    if (this.state.profileAllNftsPathName.test(location.pathname)) {
      this.setState({ currentTab: '1' });
    } else if (this.state.profileSellNftsPathName.test(location.pathname)) {
      this.setState({ currentTab: '2' });
    } else {
      this.props.history.push(`/profile/${this.props.match.params.id}/all`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    if (this.state.profileAllNftsPathName.test(location.pathname)) {
      this.setState({ currentTab: '1' });
    } else if (this.state.profileSellNftsPathName.test(location.pathname)) {
      this.setState({ currentTab: '2' });
    }
  }


  renderNftr() {
    return <NftrInfo memerName={this.props.match.params.id} {...this.props} />;
  }

  renderNftrNfts() {
    return (
      <Tabs activeKey={this.state.currentTab} className="memer-tabs">
        <Tabs.TabPane
          tab={
            <Link to={`/profile/${this.props.match.params.id}/all`} className="tab-link">
              All
            </Link>
          } key="1"
        >
          <Route
            path={`/profile/${this.props.match.params.id}/all/:page?`}
            render={routeProps => <UserNfts {...routeProps} profile={this.props.match.params.id} />}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <Link to={`/profile/${this.props.match.params.id}/sale`} className="tab-link">
              Selling
            </Link>
          } key="2"
        >
          <Route
            path={`/profile/${this.props.match.params.id}/sale/:page?`}
            render={routeProps => <SellingNfts {...routeProps} profile={this.props.match.params.id} />}
          />
        </Tabs.TabPane>
      </Tabs>
    );
  }

  render() {
    return (
      <div className="memer-page">
        { this.renderNftr() }
        { this.renderNftrNfts() }
      </div>
    );
  }
}

const mapStateToProps = ({ parseReducers }) => {
  const { currentUser } = parseReducers;
  return { currentUser };
};

export default withRouter(connect(mapStateToProps, {
  getCurrentUser,
})(Profile));
