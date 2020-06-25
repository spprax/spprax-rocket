import React from 'react';


class ProgressBar extends React.Component {
  render() {
    let progressRatio = this.props.currentIndex / this.props.indexLength;
    let width = 400;

    let styleContainer = {};
    styleContainer.display = this.props.toggleOn ? "block" : "none";


    let styleText = {
      position: 'relative',
      top: '-5px',
      left: `${Math.round(progressRatio * width) - 50}px`,
      transition: 'left 0.25s',
      fontSize: '0.8em'
    }

    let styleOuter = {
      position: 'absolute',
      width: `${width}px`,
      height: '12px',
      borderRadius: '4px',

      margin: '0',
      padding: '0',
      overflow: 'hidden',

      backgroundColor: 'grey'
    }

    let styleInner = {
      position: 'absolute',
      top: '0',
      zIndex: 1,
      borderRadius: '0',
      backgroundColor: this.props.fgColor ? this.props.fgColor : 'lightgrey',
      width: `${Math.round(progressRatio * width)}px`,

      transition: 'width 0.25s'
    }


    return (
      <div className='progress-container' style={styleContainer}>
        <span style={styleText}>{Math.round(progressRatio * 100)}% completed</span>

        <div className='progress-bar' style={styleOuter}>
          <div className='progress-container' style={{ ...styleOuter, ...styleInner}}>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
