import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Event } from '@App/store/types';
import { connect } from 'react-redux';
import { requestAllEvents } from '../../store/actions';

import Title from '@App/components/Title';
import Logo from '@App/components/Logo';
import SubTitle from '@App/components/SubTitle';
import DataSelector from '@App/components/DataSelector';

 // import store from '@App/store';

const LogoUrl = require('../../assets/images/logo-birdie.svg');

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    background-color: #F9F9F9;
    > div {
      height: 100%;
    }
  }
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

class App extends React.Component <StateProps> {
  componentWillMount() {
    this.props.dispatch(requestAllEvents('df50cac5-293c-490d-a06c-ee26796f850d'));
    // tslint:disable-next-line:no-console
    console.log(this);
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Logo src={LogoUrl} />
          <Title>Welcome to the birdie test</Title>
          <SubTitle>Best of luck!</SubTitle>
          <DataSelector />
        </AppContainer>
      </>
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
  data?: Event[];
  types?: string[];
  dispatch?: any;
}

export default connect(mapStateToProps)(App);