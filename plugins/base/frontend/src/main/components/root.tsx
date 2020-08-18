import React from 'react';
import {render} from 'react-dom';
import RedBox from 'redbox-react';

import App from "./app";
import './app/index.scss';
import { NavigationPaneSearch } from './navigationPaneSearch/navigationPaneSearch';
import { PageSummary } from './pageSummary/pageSummary';

const appEl = document.getElementById('searchBar');
const rootEl = document.createElement('div');

const renderNavigationPane = () => {
  render(
    <NavigationPaneSearch />,
    document.getElementById('paneSearch')
  )
}

const renderOnThisPage = () => {
  setTimeout(() => {
    for(const e of document.querySelectorAll('.tabs-section-body > div[data-togglable]')){
      const category = e.getAttribute('data-togglable')
      const entries = Array.from(e.querySelectorAll('a[anchor-label]')).map((element: HTMLElement) => {
        return {
          location: element.getAttribute('data-name'),
          label: element.getAttribute('anchor-label'),
          htmlElement: element
        }
      })
      if(entries.length){
        const element = document.createElement('div')
        render(<PageSummary category={category} entries={entries}/>, element)
        e.appendChild(element)
      }
    }
  })
}

let renderApp = () => {
  render(
      <App/>,
      rootEl
  );
  renderNavigationPane();
  renderOnThisPage();
};

// @ts-ignore
if (module.hot) {
  const renderAppHot = renderApp;
  const renderError = (error: Error) => {
    render(
        <RedBox error={error}/>,
        rootEl
    );
  };

  renderApp = () => {
    try {
      renderAppHot();
    } catch (error) {
      renderError(error);
    }
  };

  // @ts-ignore
  module.hot.accept('./app', () => {
    setTimeout(renderApp);
  });
}

renderApp();
appEl!.appendChild(rootEl);
