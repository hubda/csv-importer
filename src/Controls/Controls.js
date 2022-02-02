import './Controls.css';
import React, {Component} from 'react'
import { makeCsvFile } from '../Helper.js'

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: props.contents,
      disabled: props.disabled
    };

    this.handleDupeCheck = this.handleDupeCheck.bind(this);
  }

  handleDupeCheck(method) {
    let dupedCheckContents = this.state.contents;
    const emailIndex = 2;
    const phoneIndex = 3;
    let name = '';

    if (method.indexOf('email') > -1) {
      dupedCheckContents = this.startDupeCheck(dupedCheckContents, emailIndex);
      name += 'email_'
    }

    if (method.indexOf('phone') > -1) {
      dupedCheckContents = this.startDupeCheck(dupedCheckContents, phoneIndex);
      name += 'phone_'
    }

    name += 'dupecheck_';
    console.log('dupedCheckContents: ' + dupedCheckContents);
    makeCsvFile(dupedCheckContents, name);
  }

  startDupeCheck(contents, dataIndex) {
    const dupeCheckedList = [];

    const filteredContents = contents.filter(row => {
      const dataToCheck = dupeCheckedList.map(row => {
        return row.split(',')[dataIndex];
      });

      const data = row.split(',')[dataIndex];
      dupeCheckedList.push(row);

      return dataToCheck.indexOf(data) === -1;
    });

    return filteredContents;
  }

  render() {
    return (
      <div className="Controls">
        <button onClick={() => this.handleDupeCheck(['email'])} disabled={this.state.disabled}>Duplicate Check by Email</button>
        <button onClick={() => this.handleDupeCheck(['phone'])} disabled={this.state.disabled}>Duplicate Check by Phone</button>
        <button onClick={() => this.handleDupeCheck(['email', 'phone'])} disabled={this.state.disabled}>Duplicate Check by Email and Phone</button>
      </div>
    );
  }
}

export default Controls;
