import React from 'react';
import './css/index.css';
import { Row, Col } from 'antd';

import watch1 from '../../images/landing/watch-1.png';
import watch2 from '../../images/landing/watch-2.png';
import watch3 from '../../images/landing/watch-3.png';
import watch4 from '../../images/landing/watch-4.png';
import watch5 from '../../images/landing/watch-5.png';
import watch6 from '../../images/landing/watch-6.png';
import watch7 from '../../images/landing/watch-7.png';
import watch8 from '../../images/landing/watch-8.png';
import watch9 from '../../images/landing/watch-9.png';
import watch10 from '../../images/landing/watch-10.png';
import watch11 from '../../images/landing/watch-11.png';
import watch12 from '../../images/landing/watch-12.png';


import meme1 from '../../images/landing/watch-1.png';
import meme2 from '../../images/landing/make-meme-l1-2.jpg';
import meme3 from '../../images/landing/make-meme-l1-3.jpg';
import meme4 from '../../images/landing/make-meme-l1-4.jpg';
import meme5 from '../../images/landing/make-meme-l2-1.jpg';
import meme6 from '../../images/landing/make-meme-l2-2.jpg';
import meme7 from '../../images/landing/make-meme-l2-3.jpg';
import meme8 from '../../images/landing/make-meme-l2-4.jpg';
import meme9 from '../../images/landing/make-meme-l3-1.jpg';
import meme10 from '../../images/landing/make-meme-l1-5.jpg';
import meme11 from '../../images/landing/make-meme-l2-5.jpg';
import meme12 from '../../images/landing/make-meme-l3-2.jpg';

const AppLandingSlots = () => {
  return (
    <div className="landing-slots">
      <Row align="top" justify="start" type="flex">
        <Col className="landing-slot-cols">
          <Row align="top" justify="start" type="flex" className="landing-pattern" gutter={10}>
            <Col className="landing-meme-container">
              <img
                src={watch1}
                alt="watch"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={watch2}
                alt="watch"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={watch3}
                alt="watch"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={watch4}
                alt="watch"
                className="landing-meme"
              />
            </Col>
          </Row>
        </Col>
        <Col className="landing-slot-cols">
          <Row align="top" justify="start" type="flex" className="landing-pattern" gutter={10}>
            <Col className="landing-meme-container">
              <img
                src={watch7}
                alt="watch"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={watch6}
                alt="watch"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={watch5}
                alt="watch"
                className="landing-meme"
              />
            </Col>
            
            <Col className="landing-meme-container">
              <img
                src={watch8}
                alt="watch"
                className="landing-meme"
              />
            </Col>
          </Row>
        </Col>

        <Col className="landing-slot-cols">
          <Row align="top" justify="start" type="flex" className="landing-pattern" gutter={10}>

            <Col className="landing-meme-container">
              <img
                src={watch9}
                alt="watch"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={watch10}
                alt="watch"
                className="landing-meme"
              />
            </Col>
            <Col className="landing-meme-container">
              <img
                src={watch12}
                alt="watch"
                className="landing-meme"
              />
              <Col className="landing-meme-container">
                <img
                  src={watch11}
                  alt="watch"
                  className="landing-meme"
                />
              </Col>
            </Col>
          </Row>
        </Col>

      </Row>
    </div>
  );
};

export default AppLandingSlots;
