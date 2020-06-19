import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "Questions",
      questions: [],
    };
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
        questions: prevState.questions.concat(newObj)
      }), );
    });
  }

  listOptions(options) {
    if (options) {
      return options.map((option, index) => {
        return (
          <li key={index}>{option}</li>
        )
      });
    } else {
      return (
        <li>-</li>
      )
    }
  }

  listItems() {
    return this.state.questions.map((question) => {
      return (
        <ul key={question.id} className='question'>
          <li className='q-title'>{question.title}</li>
          <li className='q-content'>{question.content}</li>
          <li className='q-type'>{question.type}</li>
          <li className='q-options'>
            Options
            <ul>{this.listOptions(question.options)}</ul>
          </li>
          <li className='q-prompt'>{question.prompt}</li>
        </ul>
      )
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
          { this.state.title }
        </h1>

        { this.listItems() }
      </div>
    );
  }
}

export default App;
