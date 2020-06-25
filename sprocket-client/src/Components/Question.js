import React from 'react';

import QuestionMultichoice from './QuestionTypes/QuestionMultichoice';
import QuestionSlider from './QuestionTypes/QuestionSlider';
import QuestionText from './QuestionTypes/QuestionText';

class Question extends React.Component {
  constructor(props) {
    super(props);
    // Setting default values

    this.setSelection = this.setSelection.bind(this);
  }

  componentDidMount() {
    this.componentDidUpdate();

    let qType = this.props.question.type.toUpperCase();
    console.log(qType, this.props.id);

    if (qType === "SLIDER") {
      this.props.onChange(this.props.question.options[0]);
      console.log("Set!");
    }
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
    switch (this.props.question.type.toUpperCase()) {
      case "MULTICHOICE":
        return <QuestionMultichoice {...this.props} />;

      case "INPUT":
        return <QuestionText {...this.props} />;

      case "SLIDER":
        return <QuestionSlider {...this.props} />;

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
