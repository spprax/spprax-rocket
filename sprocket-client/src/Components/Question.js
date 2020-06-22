import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = { answer: undefined };

    // Setting default values
    let qType = this.props.question.type.toUpperCase();

    if (qType === "SLIDER") {
      this.state.answer = this.props.question.options[0];
      this.props.onChange(this.state.answer);
    }

    this.setSelection = this.setSelection.bind(this);
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.toggleOn) {
      console.log("Component", this.props.id, "toggled on");
      window.addEventListener("keydown", this.setSelection);
    } else {
      window.removeEventListener('keydown', this.setSelection);
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
          outline: 'none'
        }

        const stylePrompt = {
          fontSize: '0.8em',
          fontWeight: '500',
          display: 'inline-block',
          verticalAlign: 'center',
          marginLeft: '5px',
          textTransform: 'uppercase',
        }

        return (
          <ol style={style}>
            {this.props.question.options.map((option, index) => {
              let selected = this.props.currentAnswer === option;
              return (
                <li key={index} style={listStyle}>
                  <input
                    name={this.props.id}
                    type='radio'
                    onChange={e => {
                      this.props.onChange(option)
                    }}
                    checked={selected}
                  /> {option} <span style={stylePrompt}>[{String.fromCharCode(97 + index).toUpperCase()}]</span>
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

          borderBottom: "1px solid #777"
        };

        return (
          <input
            style={style}
            type='text'
            placeholder={this.props.question.prompt}
            onChange={e => {
              this.props.onChange(e.target.value);
            }}
            disabled={this.props.toggleOn ? undefined : "disabled"}
          />
        );

      case "SLIDER":
        let options = this.props.question.options;

        style = {
          width: '350px',
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
            <span style={textStyle}>{this.state.answer} {this.props.question.prompt}</span>
          </p>
        )

      default:
        break;
    }
  }

  setSelection(event) {
    let selection = event.key;

    if (selection === "Enter") {
      this.props.submit();
      console.log(this.props.currentAnswer);
      return;
    }

    if (this.props.question.type.toUpperCase() === "MULTICHOICE" && selection) {
      let index = selection.toLowerCase().charCodeAt(0) - 97;

      if (this.props.question.options[index]) {
        this.props.onChange(this.props.question.options[index]);
      }
    }

  }

  render() {
    let style;
    if (this.props.toggleOn) {
      style = {
        opacity: '1',
        zIndex: '0',
        outline: 'none',

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

      <li
        className='question'
        style={style}
        tabIndex={this.props.toggleOn ? "0" : undefined}
      >
        <div className='question-content'>
          <h4><span>{parseInt(this.props.question.id) + 1}. </span>{this.props.question.content}</h4>
          {this.renderInputMethod()}
        </div>
      </li>
    );
  }
}

export default Question;
