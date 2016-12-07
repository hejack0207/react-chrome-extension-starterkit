import {Message} from "../messaging";

export enum MessageType {
  showTweetLink = 100,
  destroyFrame = 101
}

export abstract class ContentScriptMessage extends Message<MessageType> {
  tabId: number;

  constructor(type: MessageType, tabId: number) {
    super(type);
    this.tabId = tabId;
  }
}

export class DestroyFrameMessage extends ContentScriptMessage {
  constructor(tabId: number) {
    super(MessageType.destroyFrame, tabId);
  }
}

export class ShowTweetLinkMessage extends ContentScriptMessage {
  url: string;

  constructor(url: string, tabId: number) {
    super(MessageType.showTweetLink, tabId);
    this.url = url;
  }
}