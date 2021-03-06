import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, Alert, Button, Popconfirm, message, Spin } from 'antd';
import Clipboard from 'clipboard';
import { withRouter } from 'react-router-dom';
import Parse from 'parse';
import {
  getNftr,
} from '../../actions';
import './css/index.css';


class NftrInfo extends Component {

  componentWillMount() {
    this.props.getNftr({ memer: this.props.memerName });
  }
  
  componentDidMount() {
    new Clipboard('.memer-address');
  }

  renderNftrInfo() {
    const logout = () => {
      Parse.User.logOut();
      message.success('You have been logged out.');
      this.props.history.push('/');
      window.location.reload();
    };

    return (
      <header className="memer-info-wrapper">
        <div className="memer-avatar">
          <img alt="memer" src={`${process.env.REACT_APP_SERVER + process.env.REACT_APP_SERVER_PUBLIC}avatars/${this.props.memer.success.avatar}`} />
        </div>
        <section className="memer-info margin-horizontal-large">
          <h1 className="memer-name">{ this.props.memer.success.memer }</h1>
          <div className="memes-owned">
            NFTs owned: {
              this.props.memes.loading ? (
                <React.Fragment> &nbsp; <Spin /> </React.Fragment>
              ) : <strong>{this.props.ownedNftCount}</strong>
            }
          </div>
          <div>
            <Popover content={this.props.memer.success.username} title="Copied to clipboard" placement="right">
              <a className="memer-address" data-clipboard-text={this.props.memer.success.username}>
                <span>Copy address</span>
              </a>
            </Popover>
            { 
              this.props.memer.success.sameUser ? (
                <Popconfirm
                  title="Do you really want to logout?"
                  onConfirm={logout}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#" className="margin-horizontal-medium memer-settings">Logout</a>
                </Popconfirm>
                // <a className="margin-horizontal-medium memer-settings"> <span>Settings</span> </a>
              ) : null
            }
          </div>
        </section>
      </header>
    );
  }

  renderNftrInfoError() {
    return (
      <div className="error-wrapper">
        <Alert
          message="Error!"
          description={this.props.memer.errors.message}
          type="error"
          showIcon
        />
        <div
          className="margin-vertical-large"
        >
          <Button
            type="default"
            size="large"
            onClick={() => this.props.getNftr({ memer: this.props.memerName })}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.memer.loading) {
      return (
        <div className="memes-loading-wrapper margin-large">
          <Spin size="large" />
        </div>
      );
    } else {
      if (this.props.memer.success.ok) {
        return this.renderNftrInfo();
      } else if (this.props.memer.errors.error) {
        return this.renderNftrInfoError();
      } else {
        return null;
      }
    }
  }
}

const mapStateToProps = ({ memerReducers, memesReducers }) => {
  const { memer, ownedNftCount } = memerReducers;
  const { memes } = memesReducers;
  return { memer, ownedNftCount, memes };
};

export default withRouter(connect(mapStateToProps, {
  getNftr,
})(NftrInfo));
