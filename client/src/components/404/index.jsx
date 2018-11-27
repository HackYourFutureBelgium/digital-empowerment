import React from 'react';
import NProgress from 'nprogress';

const NotFound = () => {
  NProgress.done(true);

  return <p>Page not found</p>;
};

export default NotFound;
