import React from 'react';


class QuestionMultichoice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style = {
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
  }
}

export default QuestionMultichoice;
