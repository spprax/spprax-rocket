import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = { answer: undefined };

    // Setting default values
    let qType = this.props.question.type.toUpperCase();

    if (qType === "SLIDER") {
      this.state.answer = this.props.question.options[0];
    }
  }

  renderInputMethod() {
    switch (this.props.question.type.toUpperCase()) {
      case "MULTICHOICE":
        return (
          <ol>
            {this.props.question.options.map((option, index) => {
              return (
                <li key={index}>
                  <input
                    name={this.props.id}
                    value={option}
                    type='radio'
                    onChange={e => this.setState({ answer: e.target.value })}
                  /> {option}
                </li>
              );
            })}
          </ol>
        );

      case "INPUT":

        return (
          <input
            type='text'
            placeholder={this.props.question.prompt}
            onChange={e => this.setState({ answer: e.target.value })}
          />
        );

      case "SLIDER":
        let options = this.props.question.options;

        return (
          <p>
            <input
              type='range'
              min={options[0]}
              max={options[1]}
              onChange={e => this.setState({ answer: e.target.value })}
              defaultValue={options[0]}
            />
            <span> {this.state.answer}</span>
          </p>
        )

      default:
        break;
    }
  }

  render() {
    let style;
    if (this.props.toggleOn) {
      style = {
        opacity: '1',
        display: 'block',
        position: 'absolute',

        transition: 'opacity 0.5s',
        transitionDelay: '0.5s',
      }
    } else {
      style = {
        opacity: '0',
        display: 'block',
        position: 'absolute',

        transition: 'opacity 0.5s',
        transitionDelay: '0s',
      }
    }

    return (

      <li className='question' style={style}>
        <h4>{this.props.question.content}</h4>
        {this.renderInputMethod()}
      </li>
    );
  }
}

export default Question;
