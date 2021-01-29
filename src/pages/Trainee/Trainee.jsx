import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';
import apolloClient from '../../libs/apollo-client';

export const Trainee = (props) => {
  const { match: { path } } = props;
  return (
    <ApolloProvider client={apolloClient}>
      <Switch>
        <Route exact path={path} component={TraineeList} />
        <Route exact path={`${path}/:traineeid`} component={TraineeDetail} />
      </Switch>
    </ApolloProvider>
  );
};

Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};
