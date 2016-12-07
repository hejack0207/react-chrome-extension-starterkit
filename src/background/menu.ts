import OnClickData = chrome.contextMenus.OnClickData;
import Tab = chrome.tabs.Tab;
import {ShowTweetLinkMessage} from "../content_scripts/protocol";

enum menuItemId {
  showTweetLinkUi
}

chrome.contextMenus.onClicked.addListener((info: OnClickData, tab: Tab) => {
  if (info.menuItemId === menuItemId.showTweetLinkUi.toString()) {
    chrome.tabs.sendMessage(tab.id, new ShowTweetLinkMessage(info.linkUrl, tab.id), response => {
      console.log(response);
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    contexts: ['link'],
    title: 'Tweet Link',
    id: menuItemId.showTweetLinkUi.toString()
  })});