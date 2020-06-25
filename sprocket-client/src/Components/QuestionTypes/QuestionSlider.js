import React from 'react';


class QuestionSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let options = this.props.question.options;

    let style = {
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
        <span style={textStyle}>{this.props.currentAnswer} {this.props.question.prompt}</span>
      </p>
    )
  }
}

export default QuestionSlider;
