import './App.css';
import FileInput from './FileInput/FileInput.js'
import Controls from './Controls/Controls.js'
import React, {Component} from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      showError: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    let reader = new FileReader();

    reader.onload = (file) => {
      console.log('file ' + file);
      const contents = file.target.result;
      const contentArray = contents.split('\r\n').filter(row => {
        return row && row.length > 0;
      });

      this.checkDataAndSetState(contentArray);
    };

    reader.onload = reader.onload.bind(this);
    reader.readAsBinaryString(data.target.files[0]);
  }

  checkDataAndSetState(contentArray) {
    const HEADER_ROW = 'FirstName,LastName,Email,Phone';

    if (contentArray && contentArray.length > 0) {
      const existingHeaderRow = contentArray[0];

      if (HEADER_ROW === existingHeaderRow) {
        this.setState({
          showError: false,
          contents: contentArray
        });
      } else {
        this.setState({
          showError: true
        });
      }

    }
  }

  render() {
    let error = '';
    const controlKey = this.state.contents.length + this.state.showError;

    if (this.state.showError) {
      error =
        <div>
          <h4>Invalid file header, please enter another file with the valid file header</h4>
        </div>;
    }

    return (
      <div className="App">
        <FileInput handleChange={this.handleChange}/>
        <p/>
          {error}
        <p/>
        <Controls key={controlKey} disabled={this.state.showError || this.state.contents.length === 0} contents={this.state.contents}/>
      </div>
    )
  }
}

export default App;
