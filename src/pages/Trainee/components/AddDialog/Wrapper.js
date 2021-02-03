/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Mutation } from '@apollo/react-components';
import { CREATE_USER } from './Mutation';
import AddDialog from './AddDialog';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const prop = this.props;
    return (
      <Mutation mutation={CREATE_USER}>
        {(createTrainee) => (
          <>
            <AddDialog createTrainee={createTrainee} {...prop} />
          </>
        )}
      </Mutation>
    );
  }
}
