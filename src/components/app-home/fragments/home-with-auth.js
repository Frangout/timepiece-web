import React, { Component } from 'react';
import { NavLink, Switch, Route, Link } from 'react-router-dom';
// import { Icon } from 'antd';
import AppHeader from '../../app-header';
import Nftr from '../../../routes/nfter';
import CommonHome from './common-home';
import Create from '../../../routes/create';
import Nft from '../../../routes/nft';
import Profile from '../../../routes/profile';
import FourOFour from '../../../routes/404';
import FAQ from '../../../routes/faq';
import Privacy from '../../../routes/privacy';
import MarketPlace from '../../../routes/marketplace';
import discord from '../../../images/vendor/discord.png';
import reddit from '../../../images/vendor/reddit.png';
import instagram from '../../../images/vendor/insta.jpeg';
import '../css/index.css';


class HomeWithAuth extends Component {

  getHeaderFragment() {
    return (
      <AppHeader>
        <React.Fragment>
          <NavLink
            exact
            to="/marketplace/sale"
            className="app-navigation-items"
            activeClassName="app-navigation-active"
          >
            MarketPlace
          </NavLink>
          <NavLink
            exact
            to="/my-nfts/all"
            className="app-navigation-items"
            activeClassName="app-navigation-active"
          >
            My NFTs
          </NavLink>
          <NavLink
            exact
            to="/create"
            className="app-navigation-items"
            activeClassName="app-navigation-active"
          >
            Create NFT
          </NavLink>

          <NavLink
            exact
            to="/faq"
            className="app-navigation-items"
            activeClassName="app-navigation-active"
          >
            FAQ
          </NavLink>
          
        </React.Fragment>
      </AppHeader>
    );
  }

  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <nav>
          { this.getHeaderFragment() }
        </nav>
        <main>
          <Switch>
            <Route path={`${match.path}`} exact component={CommonHome} />
            <Route path={`${match.path}my-nfts`} component={Nftr} />
            <Route path={`${match.path}create`} component={Create} />
            <Route path={`${match.path}meme/:meme`} component={Nft} />
            <Route path={`${match.path}profile/:id`} component={Profile} />
            <Route path={`${match.path}faq`} component={FAQ} />
            <Route path={`${match.path}signin`} component={CommonHome} />
            <Route path={`${match.path}privacy-policy`} component={Privacy} />
            <Route path={`${match.path}marketplace`} component={MarketPlace} {...this.props} />
            <Route component={FourOFour} />
          </Switch>
        </main>

        <footer className="footer-wrapper">

          <div className="margin-vertical-large flex justify-space-around">
            {/* <a
              className="discord"
              href="https://discord.gg/7A7xkDt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={discord} className="logo" />           
            </a>
            <a
              className="facebook"
              href="https://www.facebook.com/NftsChain-1819082745051769"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="facebook" />
            </a>
            <a
              className="twitter"
              href="https://www.twitter.com/memeschain"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="twitter" />
            </a>
            <a
              className="reddit"
              href="https://www.reddit.com/r/NftsChain/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={reddit} className="logo" />  
            </a>
            <a
              href="https://www.instagram.com/memeschainapp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} className="logo" />  
            </a> */}
          </div>

          <div className="flex justify-space-around">
            <div className="flex-column margin-vertical-large">
        
              <React.Fragment>
                <Link to="/my-nfts/all">My NFTs</Link>
                <Link to="/create">Create NFT</Link>
                <Link to="/faq">FAQ</Link>
              </React.Fragment>
          
            </div>
            <div className="flex-column margin-vertical-large">
              <a href="mailto:hello@memeschain.com">Contact</a>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link
                to="https://app.termly.io/document/disclaimer/d6d1464e-ec3c-448e-91a1-0241ebba5e42"
                target="_blank"
              >
                Disclaimer
              </Link>
              <span>&copy; Timepiece NFTs 2022 </span>
            </div>
          </div>

        </footer>

      </React.Fragment>
    );
  }
}

export default HomeWithAuth;
