import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import PricingDetails from './components/pricing-details';
import { Popover } from 'antd';
import reducers from './reducers/index';
import Auth from './routes/auth';
import { XRPContext } from './context';
class ScrollToTop extends Component {

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  render() {
    return this.props.children;
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    console.log(this.props)
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <XRPContext.Provider value={this.props.xrp}>
          <Router>
            <React.Fragment>
              {/* <Popover
                placement="bottom"
                content={<PricingDetails />}
              >
                <div className="app-wide-updates-wrapper">
                  <Link to="/create">Own and monetise memes for <span>free!</span></Link>
                </div>
              </Popover> */}
              <ScrollToTop>
                <Auth path="/" />
              </ScrollToTop>
            </React.Fragment>
          </Router>
        </XRPContext.Provider>
      </Provider>
    );
  }
}
export default App;
