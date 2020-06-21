import React from 'react';

import Question from './Components/Question';
import Button from './Components/Button';

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
    } else {
      return (500, "Error: Specified question index does not exist!");
    }
  }

  handleSubmit(...args) {
    console.log("Make ajax call here.");
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
      <div>
        <h1>
          { this.state.title }
        </h1>

        <ul>
          {questionList}
        </ul>

        <div className='btn-container'>
          <Button
            text='Previous'
            onClick={this.handleChangeIndex}
            direction={-1}
            toggleOn={this.state.currentQuestionIndex !== 0}
          />

          <Button
            text='Submit'
            onClick={this.handleSubmit}
            direction='submit'
            toggleOn={this.state.currentQuestionIndex + 1 === this.state.questions.length}
          />

          <Button
            text='Next'
            onClick={this.handleChangeIndex}
            direction={1}
            toggleOn={this.state.currentQuestionIndex + 1 < this.state.questions.length}
          />
        </div>
      </div>
    );
  }
}

export default App;
