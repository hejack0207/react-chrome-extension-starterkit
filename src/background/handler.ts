import Handlers from "./handlers";

chrome.runtime.onMessage.addListener((message: any, sender: any, callback: (x: any) => void) => {
  const handler = Handlers[message.type];
  if (!!handler)
    return handler(message, callback);
  return false;
});

