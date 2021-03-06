import React from 'react';
import { Route } from 'react-router-dom';

import { withErrorBoundary } from '~infra/ErrorBoundary';

import Images from './images';
import Layouts from './layouts';
import Posts from './posts';
import Reports from './reports';
import Search from './search';

const Router = () => (
  <div>
    <Route path='/images' component={withErrorBoundary(Images)} />
    <Route path='/layouts' component={withErrorBoundary(Layouts)} />
    <Route path='/posts' component={withErrorBoundary(Posts)} />
    <Route path='/reports' component={withErrorBoundary(Reports)} />
    <Route path='/search' component={withErrorBoundary(Search)} />
  </div>
);

export default Router;
