import React from 'react';

import Question from './Components/Question';
import Button from './Components/Button';
import ProgressBar from './Components/ProgressBar';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      questions: [],
      currentQuestionIndex: 0,

      qAnswers: [],
    };

    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.getInformation();
  }

  componentDidUpdate() {
  }

  getInformation() {
    fetch('/api/question').then(async res => {
      let newObj = await res.json();

      this.setState((prevState) => ({
        questions: newObj,
        qAnswers: new Array(newObj.length).fill(null),
      }));
    });
  }

  setAnswer(answer) {
    let index = this.state.currentQuestionIndex;
    // Change current answer object based on new values.
    let currentAnswers = this.state.qAnswers;
    currentAnswers[index] = answer;
    this.setState({ qAnswers: currentAnswers})
  }

  // direction of set {1, -1}
  handleChangeIndex(direction) {
    let currentQuestionIndex = this.state.currentQuestionIndex;



    if (this.state.questions[currentQuestionIndex + direction]) {
      this.setState({ currentQuestionIndex: currentQuestionIndex += direction });
    } else if (currentQuestionIndex + direction === this.state.questions.length) {
      this.handleSubmit();
    } else {
      return (500, "Error: Specified question index does not exist!");
    }
  }

  handleSubmit(...args) {
    console.log("Make ajax call here.");
  }

  handleKeyPress(event) {
    switch (event.key) {
      case "n":
      case "Enter":
        this.handleChangeIndex(1);
        break;

      case "p":
        this.handleChangeIndex(-1);
        break;

      default:
        return null;
    }
  }

  render() {
    let currentIndex = this.state.currentQuestionIndex;

    let questionList = this.state.questions.map((qn) => {
      return (
        <Question
          key={qn.id}
          question={this.state.questions[qn.id]}
          toggleOn={parseInt(qn.id) === currentIndex}
          id={qn.id}
          onChange={this.setAnswer}
        />
      );
    })

    return (
      <div className='app' onKeyDown={this.handleKeyPress} tabIndex="0">
        <h1>
          { this.state.title }
        </h1>

        <ul className='question-container'>
          {questionList}
        </ul>

        <div className='btn-container'>
          <Button
            text='Previous'
            keyPrompt="P"
            onClick={this.handleChangeIndex}
            direction={-1}
            toggleOn={this.state.currentQuestionIndex !== 0}
          />

          <Button
            text='Submit'
            keyPrompt='Ent.'
            onClick={this.handleSubmit}
            direction='submit'
            toggleOn={this.state.currentQuestionIndex + 1 === this.state.questions.length}
          />

          <Button
            text='Next'
            keyPrompt='Ent.'
            onClick={this.handleChangeIndex}
            direction={1}
            toggleOn={this.state.currentQuestionIndex + 1 < this.state.questions.length}
          />
        </div>

        <ProgressBar
          currentIndex={this.state.currentQuestionIndex}
          indexLength={this.state.questions.length}
          toggleOn={this.state.questions.length !== 0}
        />
      </div>
    );
  }
}

export default App;
