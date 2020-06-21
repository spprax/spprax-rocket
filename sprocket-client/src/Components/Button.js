import React from 'react';


class Button extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.change(this.props.direction);
  }

  render() {
    const styleDiv = {
      boxStyle: 'border-box',
      textAlign: 'center',
      position: 'absolute',
      bottom: '100px',
      zIndex: '1',

      padding: '10px 0',
      width: '100px',
      border: '2px solid #555',
      borderRadius: '10px',
      display: 'inline-block',

      visibility: this.props.toggleOn ? 'visible' : 'hidden',
    }

    const styleText = {
      padding: '0',
      margin: '0'
    }

    return (
      <div onClick={this.handleClick} style={styleDiv}>
        <p style={styleText}>{ this.props.text }</p>
      </div>
    );
  }
}

export default Button;
