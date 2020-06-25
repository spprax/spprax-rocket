import React from 'react';


class QuestionText extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  componentDidUpdate() {
    this.input.current.focus();
  }

  render() {
    let style = {
      boxStyle: 'border-box',
      padding: '10px',
      border: "0",
      outline: "none",

      borderBottom: "1px solid #777"
    };

    return (
      <input
        ref={this.input}
        style={style}
        type='text'
        placeholder={this.props.question.prompt}
        onChange={e => {
          this.props.onChange(e.target.value);
        }}
        disabled={this.props.toggleOn ? undefined : "disabled"}
      />
    );
  }
}

export default QuestionText;
