import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Parse from 'parse';
import { Row, Col, Button, Steps } from 'antd';
import AppLandingSlots from '../../../components/app-landing-slots';
import '../css/index.css';
import you from '../../../images/landing-intro/you.jpg';
import meme from '../../../images/landing-intro/meme.jpg';
import owned from '../../../images/landing-intro/owned.jpg';
import discord from '../../../images/vendor/discord.png';
import reddit from '../../../images/vendor/reddit.png';
import instagram from '../../../images/vendor/insta.jpeg';
import brands from "../../../images/landing/brands.png";

const Step = Steps.Step;
class CommonHome extends Component {

  componentWillMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="route-home">
        <Row type="flex" className="padding-large flex-wrap-reverse">
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} className="landing-slots-wrapper">
            <AppLandingSlots />
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
            <div className="app-headline circular-medium">
              <div className="app-headline-two-part-wrapper">
                <div className="text">
                  <h1>Luxury Timepieces & Dials as NFTs.</h1>
                </div>
              </div>
              
              <div className="margin-vertical-large">
                <p className="sub-heading no-margin align-center padding-horizontal">
                Authenticate timepieces from brands with NFTs & a marketplace for artists and brands to sell their digital dials and timepieces to users & in Metaverse.                </p>
              </div>
              <br />
              <div className="app-home-primary-action-wrapper align-center">
                { Parse.User.current() ? (
                    <Button type="primary" className="app-primary-large">
                      <Link to="/my-nfts/all">My Timepieces</Link>
                    </Button>
                  ) : (
                    <Button type="primary" className="app-primary-large">
                      <Link to="/signin">Sign In</Link>
                    </Button>
                  )
                }
              </div>
            </div>
          </Col>
        </Row>

        <div className="brands">
          <img src={brands} />
        </div>   

        <div className="memes-chain-description">
          <div className="hero">
            <h2>What are Timepiece NFTs by Frangout?</h2>
            <p>
              Timepiece NFTs is a platform that allows watch enthusiasts to authenticate their ownership of exquisite timepieces on the blockchain as NFTs both while purchasing and re-selling.
            </p>
          </div>
        </div>     

        <div className="meme-explainer align-center">
          <h2>How does it work for buyers?</h2>
            <Steps current={1} onChange={() => null} direction="vertical">
            <Step title="Step 1" description="This is a description." />
            <Step title="Step 2" description="This is a description." />
            <Step title="Step 3" description="This is a description." />
          </Steps>
        </div>
      </div>
    );
  }
}

export default CommonHome;

