import React from 'react';
import NProgress from 'nprogress';

const NotFound = () => {
  NProgress.done();

  return <p>Page not found</p>;
};

export default NotFound;
