import React from 'react';

import Question from './Components/Question';
import Button from './Components/Button';
import ProgressBar from './Components/ProgressBar';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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

  setAnswer(answer, index) {
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
    console.log(this.state.qAnswers);
    this.setState({ currentQuestionIndex : this.state.currentQuestionIndex + 1});

    fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          idArr: this.state.questions.map((question, index) => {
            return question.id;
          }),
          titleArr: this.state.questions.map((question, index) => {
            return question.title;
          }),
          answers: this.state.qAnswers
        })
      }
    );
  }

  handleKeyPress(event) {
    switch (event.key) {
      case "Enter":
        this.handleChangeIndex(1);
        break;

      default:
        return null;
    }
  }

  render() {
    let styleContent = {
      opacity: '0'
    }

    if (this.state.questions.length) {
      styleContent.opacity = '1';
    }

    return (

      <div className='app'>
        <h1 className='app-title'>{this.props.title}</h1>

        <div className='app-content' style={styleContent}>
          <ul className='question-container'>
            {this.state.questions.map((qn, index) => {
              return (
                <Question
                  key={index}
                  question={this.state.questions[index]}
                  toggleOn={index === this.state.currentQuestionIndex}
                  id={`qn-${index}`}
                  onChange={(answer) => this.setAnswer(answer, index)}
                  currentAnswer={this.state.qAnswers[index]}
                  submit={() => this.handleKeyPress({ key : "Enter"})}
                />
              );
            })}
          </ul>

          <div className='btn-container'>
            <Button
              text='Previous'
              onClick={this.handleChangeIndex}
              direction={-1}
              toggleOn={this.state.currentQuestionIndex !== 0 && this.state.currentQuestionIndex !== this.state.questions.length}
              fgColor='lightgrey'
            />

            <Button
              text='Submit'
              keyPrompt='Ent.'
              onClick={this.handleSubmit}
              direction='submit'
              toggleOn={this.state.currentQuestionIndex + 1 === this.state.questions.length}
              fgColor='turquoise'
            />

            <Button
              text='Next'
              keyPrompt='Ent.'
              onClick={this.handleChangeIndex}
              direction={1}
              toggleOn={this.state.currentQuestionIndex + 1 < this.state.questions.length}
              fgColor='turquoise'
            />
          </div>

          <ProgressBar
            currentIndex={this.state.currentQuestionIndex}
            indexLength={this.state.questions.length}
            toggleOn={this.state.questions.length !== 0}
            fgColor='turquoise'
          />
        </div>
      </div>
    );
  }
}

export default App;
