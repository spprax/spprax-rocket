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
    let style;

    switch (this.props.question.type.toUpperCase()) {
      case "MULTICHOICE":
        style = {
          listStyle: 'none',
          padding: '0',
        }

        let listStyle = {
          padding: '5px 0',
        }
        return (
          <ol style={style}>
            {this.props.question.options.map((option, index) => {
              return (
                <li key={index} style={listStyle}>
                  <input
                    name={this.props.id}
                    value={option}
                    type='radio'
                    onChange={e => {
                      this.props.onChange(e.target.value);
                      this.setState({ answer: e.target.value});
                    }}
                  /> {option}
                </li>
              );
            })}
          </ol>
        );

      case "INPUT":
        style = {
          boxStyle: 'border-box',
          padding: '10px',
          border: "0",
          outline: "none",

          borderBottom: "1px solid #555"
        };

        return (
          <input
            style={style}
            type='text'
            placeholder={this.props.question.prompt}
            onChange={e => {
              this.props.onChange(e.target.value);
              this.setState({ answer: e.target.value});
            }}
          />
        );

      case "SLIDER":
        let options = this.props.question.options;

        style = {
          width: '300px',
        }

        let sliderStyle = {
          marginTop: '10px',
          width: '60%',
        }

        let textStyle = {
          marginLeft: '10px',
          verticalAlign: 'middle'
        }

        // slider style will be completed using css slider styling

        return (
          <p style={style}>
            <input
              style={sliderStyle}
              type='range'
              min={options[0]}
              max={options[1]}
              onChange={e => {
                this.props.onChange(e.target.value);
                this.setState({ answer: e.target.value});
              }}
              defaultValue={options[0]}
            />
            <span style={textStyle}>{this.state.answer} years old</span>
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
        zIndex: '0',

        transition: 'opacity 0.25s',
        transitionDelay: '0.25s',
      }
    } else {
      style = {
        opacity: '0',
        zIndex: '-1',

        transition: 'opacity 0.25s',
        transitionDelay: '0s',
      }
    }

    return (

      <li className='question' style={style}>
        <div className='question-content'>
          <h4><span>{parseInt(this.props.question.id) + 1}. </span>{this.props.question.content}</h4>
          {this.renderInputMethod()}
        </div>
      </li>
    );
  }
}

export default Question;
