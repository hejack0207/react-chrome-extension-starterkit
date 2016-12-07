///<reference path="../interfaces.d.ts"/>
import {Message} from "../messaging";
export enum MessageType {
  copyToClipboard,
  sendTweet
}

export class CopyToClipboardMessage extends Message<MessageType> {
  text: string;

  constructor(text: string) {
    super(MessageType.copyToClipboard);
    this.text = text;
  }
}

export class SendTweetMessage extends Message<MessageType> {
  text: string;
  url: string;
  hashtags: string;

  constructor(text: string, url: string, hashtags: string) {
    super(MessageType.sendTweet);
    this.text = text;
    this.url = url;
    this.hashtags = hashtags;
  }
}