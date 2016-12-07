import * as React from "react";
import * as ReactDOM from "react-dom";
import * as qs from "qs";
import Modal from "./modal";

interface Query {
  url: string
  tabId: string
}

const query: Query = qs.parse(window.location.search.split('?')[1]);

ReactDOM.render(
  <Modal url={query.url} containerId="root" tabId={parseInt(query.tabId, 10)} />,
  document.getElementById('root')
);