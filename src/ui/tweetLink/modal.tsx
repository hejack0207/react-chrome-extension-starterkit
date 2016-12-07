///<reference path="../../interfaces.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../browser_action/app";
import {DestroyFrameMessage} from "../../content_scripts/protocol";

//typings are not up to date. fallback to JS
const Modal = require('react-overlays/lib/Modal');

require('../../bootstrap/css/bootstrap.css');
require('../../bootstrap/css/bootstrap-theme.css');
require('./modal.scss');

interface Props {
  url: string,
  tabId: number,
  containerId: string
}

export default class Form extends React.Component<Props, void> {

  constructor(props: Props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    const {containerId, tabId} = this.props;
    const container = document.getElementById(containerId);
    ReactDOM.unmountComponentAtNode(container);
    chrome.runtime.sendMessage(new DestroyFrameMessage(tabId));
  }

  render() {
    return (
      <Modal
        show={true}
        onHide={this.close}
        className="link-modal"
        backdropClassName="link-backdrop"
      >
        <div className="link-dialog" tabIndex={-1}>
          <App url={this.props.url} onTweet={this.close}/>
        </div>
      </Modal>
    )
  }
}