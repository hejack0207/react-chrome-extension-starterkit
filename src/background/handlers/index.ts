import copyToClipboard from "./copyToClipboard";
import tweet from "./tweet";
import {Message} from "../../messaging";
import {MessageType, CopyToClipboardMessage, SendTweetMessage} from "../protocol";
import {MessageType as ContentScriptMessageType, DestroyFrameMessage} from '../../content_scripts/protocol'
import clearAll = chrome.alarms.clearAll;

interface MessageHandler {
  [index: number]: (message?: Message<MessageType> | Message<ContentScriptMessageType>, callback?: (x: any) => void) => boolean
}

const Handlers: MessageHandler = {
  [MessageType.copyToClipboard]: (message: CopyToClipboardMessage, callback: (x: string) => void) => {
    copyToClipboard(message.text, callback);
    return true;
  },
  [MessageType.sendTweet]: (message: SendTweetMessage, callback: () => void) => {
    tweet(message, callback);
    return false;
  },
  [ContentScriptMessageType.destroyFrame]: (message: DestroyFrameMessage) => {
    chrome.tabs.sendMessage(message.tabId, message);
    return false;
  }
};

export default Handlers;