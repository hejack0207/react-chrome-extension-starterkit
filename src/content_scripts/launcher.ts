import {MessageType, ShowTweetLinkMessage, ContentScriptMessage} from "./protocol";
import {ContentScriptConfig} from "../config";

require('./styles.scss');

interface LaunchConfig{
  src: string,
  className: string
}

interface LaunchConfigs {
  [index: number]: (message: ContentScriptMessage) => LaunchConfig
}

const frame = document.createElement('iframe');
frame.id = ContentScriptConfig.frameId;

const configFactories: LaunchConfigs = {
  [MessageType.showTweetLink]: (message: ShowTweetLinkMessage) => {
    return {
      src: chrome.extension.getURL(`tweet-link.html?url=${message.url}&tabId=${message.tabId}`),
      className: 'tweet-showTweetLinkUi-popup'
    }
  }
};

chrome.runtime.onMessage.addListener((message: ContentScriptMessage) => {
  if (message.type === MessageType.destroyFrame) {
    frame.parentElement.removeChild(frame);
    return false
  }

  const handler = configFactories[message.type];

  if (!!handler) {
    const config = handler(message);
    frame.src = config.src;
    frame.className = config.className;
    document.body.appendChild(frame);
  }

  return false;
});