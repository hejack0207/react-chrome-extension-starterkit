import * as React from "react";
import {getOptions, setOptions} from "../../Storage";

require('./form.scss');

interface Props {
}

interface State extends Options{
  saved?: boolean
}

export default class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {saveLinkOptions: false};
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  save() {
    setOptions(this.state, () => this.setState({saved: true}))
  }

  load() {
    getOptions((options: Options) => {
      this.setState(Object.assign({}, options, {saved: false}));
    })
  }

  render() {
    const {saved, saveLinkOptions} = this.state;
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={saveLinkOptions}
            onChange={(e) => this.setState({saveLinkOptions: e.currentTarget.checked}, this.save)}
          />
          Save Last Used Link Options.
        </label>
        {saved && <div>Options saved.</div>}
      </div>
    )
  }
}