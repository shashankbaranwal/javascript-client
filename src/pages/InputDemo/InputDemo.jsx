/* eslint-disable no-console */
import React from 'react';
import { TextField, SelectField, RadioField } from '../../components';
import { sports, cricketOptions, footballOptions } from '../../config/constants';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value }, () => {
      console.log(this.state);
    });
  }

  handleSportChange = (e) => {
    const select = e.target.value;
    this.setState({
      sport: select,
      cricket: '',
      football: '',
    });
  }

  handleCricketChange = (e) => {
    this.setState({ cricket: e.target.value }, () => {
      console.log(this.state);
    });
  }

  handleFootballChange = (e) => {
    this.setState({ football: e.target.value }, () => {
      console.log(this.state);
    });
  }

  render() {
    const { sport } = this.state;
    return (
      <>
        <div>
          <p><b>Name:</b></p>
          <TextField error="" onChange={this.handleNameChange} />
          <p><b>Select the game you play?</b></p>
          <SelectField
            error=""
            onChange={this.handleSportChange}
            options={sports}
            defaultText="Select"
          />
          <div>
            {
              (sport === '') ? ''
                : (
                  <>
                    <p><b>What you do?</b></p>
                    <RadioField
                      error=""
                      options={sport === 'cricket' ? cricketOptions : footballOptions}
                      onChange={sport === 'cricket' ? this.handleCricketChange : this.handleFootballChange}
                    />
                  </>
                )
            }
          </div>
        </div>
      </>
    );
  }
}
export default InputDemo;
