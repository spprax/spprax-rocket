import React from 'react';

import Question from './Components/Question';
import Button from './Components/Button';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "Questions",
      questions: [],
      currentQuestionIndex: 0,

      qAnswers: [],
    };

    this.handleChangeIndex = this.handleChangeIndex.bind(this);
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

  // direction of set {1, -1}
  handleChangeIndex(direction) {
    let currentQuestionIndex = this.state.currentQuestionIndex;

    if (this.state.questions[currentQuestionIndex + direction]) {
      this.setState({ currentQuestionIndex: currentQuestionIndex += direction });
    } else {
      return (500, "Error: Specified question index does not exist!");
    }
  }

  render() {
    let currentIndex = this.state.currentQuestionIndex;

    let questionList = this.state.questions.map((qn) => {
      return (
        <Question
          key={qn.id}
          question={this.state.questions[qn.id]}
          toggleOn={qn.id == currentIndex}
          id={qn.id}
        />
      );
    })

    return (
      <div className="App">
        <h1>
          { this.state.title }
        </h1>

        <ul>
          {questionList}
        </ul>

        <Button
          className='btn'
          text='Previous'
          change={this.handleChangeIndex}
          direction={-1}
          toggleOn={this.state.currentQuestionIndex !== 0}
        />

        <Button
          className='btn'
          text='Next'
          change={this.handleChangeIndex}
          direction={1}
          toggleOn={this.state.currentQuestionIndex + 1 < this.state.questions.length}
        />



      </div>
    );
  }
}

export default App;
