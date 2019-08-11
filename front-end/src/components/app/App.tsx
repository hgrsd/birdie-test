import * as React from 'react';
import { CareEvent } from '@App/store/types';
import { connect } from 'react-redux';

import Logo from '@App/components/Logo';
import TypeSelector from '@App/components/TypeSelector';
import DataSelector from '@App/components/DataSelector';
import CareRecipientSelector from '@App/components/CareRecipientSelector';

 // import store from '@App/store';

const LogoUrl = require('../../assets/images/logo-birdie.svg');

class App extends React.Component <StateProps> {

  public render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <Logo src={LogoUrl} />
            <h1>Client Portal</h1>
          </div>
          <div className="row center">
              <CareRecipientSelector />
              <br /><br />
          </div>
          <div className="row">
              <TypeSelector />
              <DataSelector />
          </div>
        </div>
      </ >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.eventsState.events,
    types: state.eventsState.types
  };
};

interface StateProps {
  events?: CareEvent[];
  types?: string[];
  dispatch?: any;
}

export default connect(mapStateToProps)(App);