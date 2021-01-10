/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const IsLoadingHOC = (WrappedComponent) => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(true);

    const setLoadingState = (isComponentLoading) => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && (
          <div style={{ marginLeft: '700px', marginTop: '30px' }}>
            <CircularProgress color="secondary" />
          </div>
        )}
        <WrappedComponent {...props} setLoading={setLoadingState} currentState={isLoading} />
      </>
    );
  }
  return HOC;
};
export default IsLoadingHOC;
