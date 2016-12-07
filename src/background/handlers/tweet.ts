import {SendTweetMessage} from "../protocol";
import * as qs from 'qs'

export default function (message: SendTweetMessage, callback?: () => void) {

  const url = `https://twitter.com/intent/tweet?${qs.stringify(message)}`;

  chrome.windows.create({
    url,
    width: 550,
    height: 420,
    focused: true,
    type: 'panel'
  });

  callback()
}