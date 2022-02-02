import './App.css';
import FileInput from './FileInput/FileInput.js'
import Controls from './Controls/Controls.js'
import React, {Component} from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    console.log('data ' + data);
    let reader = new FileReader();

    reader.onload = (e) => {
      console.log('e ' + e);
      const contents = e.target.result;
      const contentArray = contents.split('\r\n').filter(row => {
        return row && row.length > 0;
      });

      this.setState({
        contents: contentArray
      });
    };

    reader.onload = reader.onload.bind(this);
    reader.readAsBinaryString(data.target.files[0]);
  }

  render() {
    return (
      <div className="App">
        <FileInput handleChange={this.handleChange}/>
        <p/>
        <Controls key={this.state.contents.length} disabled={this.state.contents.length === 0} contents={this.state.contents}/>
      </div>
    )
  }
}

export default App;
