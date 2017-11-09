import React from 'react';new XMLHttpRequest()
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    $.ajax({
      type: "POST",
      url: "/repos",
      data: JSON.stringify(term),
      contentType: "json",
      success: function(data) {
        console.log('The search was successful.');
      },
      error: function() {
        console.log('The search was unsuccessful.');
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));