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
      textAlign: 'center',

      padding: '10px 0',
      width: '100px',
      border: '2px solid #555',
      borderRadius: '10px',

      'transition': "opacity 0.25s"
    }

    styleDiv.opacity = this.props.toggleOn ? "1" : "0";

    const styleText = {
      padding: '0',
      margin: '0'
    }

    return (
      <div className='btn' onClick={this.handleClick} style={styleDiv}>
        <p style={styleText}>{ this.props.text }</p>
      </div>
    );
  }
}

export default Button;
