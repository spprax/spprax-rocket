import React from 'react';


class Button extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.direction);
  }

  render() {
    const styleDiv = {
      boxStyle: 'border-box',

      padding: '10px 0 10px 10px',
      width: '100px',
      background: this.props.fgColor ? this.props.fgColor : 'lightgrey',
      fontWeight: '500',
      fontSize: '0.8em',
      //border: '2px solid #555',

      'transition': "opacity 0.25s"
    }

    styleDiv.opacity = this.props.toggleOn ? "1" : "0";

    const styleText = {
      padding: '0',
      margin: '0'
    }

    const stylePrompt = {
      fontSize: '0.65em',
      fontWeight: 'bold',
      verticalAlign: 'middle',
      marginLeft: '5px',
      textTransform: 'uppercase',
      'display': (this.props.keyPrompt ? 'inline-block' : 'none')
    }

    return (
      <div className='btn' onClick={this.handleClick} style={styleDiv}>
        <p style={styleText}>
          { this.props.text }
          <span className='key-prompt' style={stylePrompt}>({this.props.keyPrompt})</span></p>
      </div>
    );
  }
}

export default Button;
