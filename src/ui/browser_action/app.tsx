import * as React from "react";
import * as storage from "../../Storage";
import {LocalStorageKey} from "../../Storage";
import {SendTweetMessage, CopyToClipboardMessage} from "../../background/protocol";

interface State {
  text?: string,
  tags?: string,
  options?: Options,
  copied?: {text: string}
}

interface Props {
  url?: string,
  onTweet?: () => void
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {text: '', tags: ''};
    this.tweet = this.tweet.bind(this);
    this.copyUrl = this.copyUrl.bind(this);
  }

  componentDidMount() {
    storage.getOptions((options: Options) => {
      if (options.saveLinkOptions) {
        storage.getItem(LocalStorageKey.tweetLinkUiState, (state: State) => {
          this.setState(Object.assign({}, state, {options}))
        });
      } else {
        this.setState({options});
      }
    })
  }

  saveState() {
    if (this.state.options.saveLinkOptions) {
      storage.setItem(LocalStorageKey.tweetLinkUiState, this.state);
    }
  }

  copyUrl() {
    chrome.runtime.sendMessage(new CopyToClipboardMessage(this.props.url), (text: string) => {
      this.setState({copied: {text: `${text} was copied to your clipboard`}})
    })
  }

  tweet() {
    const {text, tags} = this.state;
    const {url, onTweet} = this.props;
    chrome.runtime.sendMessage(new SendTweetMessage(text, url, tags), () => {
      if(!!onTweet){
        onTweet()
      }
    });
  }

  render() {
    const {url} = this.props;
    const {text, tags, copied} = this.state;
    return (
      <div>
        <div>
          URL: {url}
        </div>
        <div>
          <label>
            Text
            <input
              type="text"
              value={text}
              onChange={e => this.setState({text: e.currentTarget.value}, () => this.saveState())}
            />
          </label>
        </div>
        <div>
          <label>
            Tags (comma separated)
            <input
              type="text"
              value={tags}
              onChange={e => this.setState({tags: e.currentTarget.value}, () => this.saveState())}
            />
          </label>
        </div>
        <button onClick={this.tweet}>Tweet</button>
        <button onClick={this.copyUrl}>Copy URL</button>

        {!!copied && <div>{copied.text}</div>}
      </div>
    );

  }
}
