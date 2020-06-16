import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {content : ''};
  }

  componentDidMount() {
    this.getInformation();
  }

  getInformation() {
    fetch('http://localhost:9000/')
      .then(res => res.json())
      .then(res => this.setState({content: res.content}))
  }

  render() {
    return (
      <div className="App">
        <h1>
          This is the react front-end.
        </h1>

        <p dangerouslySetInnerHTML={{
            __html: this.state.content
          }}
        ></p>
      </div>
    );
  }
}

export default App;
