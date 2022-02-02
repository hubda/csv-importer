import './FileInput.css';
import React, {Component} from 'react'

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleChange: props.handleChange
    };
  }

  render() {
    return (
      <div className="FileInput">
        <h2 for="fileSelect">Enter file below</h2>
        <p/>
        <input type="file" id="fileSelect" accept=".xlsx, .xls, .csv" onChange={this.state.handleChange}/>
      </div>
    );
  }
}

export default FileInput;
