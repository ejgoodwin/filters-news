import React from 'react';
import './App.css';
import NewsContainer from './NewsContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      newsData: []
    }
  }

  componentDidMount() {
    fetch(`https://content.guardianapis.com/search?q=feminism&page-size=30&api-key=${process.env.REACT_APP_GUARDIAN_API}&show-fields=thumbnail,trailText`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let newsDataRes = data.response.results;
        newsDataRes.forEach((item) => {
        item.show = true;
      });
      this.setState({newsData: newsDataRes})
    })
    .catch(error => {
      console.log("error" + error);
    });
  }

  handleInputChange = (event) => {
    // Due to async setState, call next method that uses this new state IN setState.
    this.setState({searchInput: event.target.value.toLowerCase()}, () => this.filterArticles());
  }

  filterArticles() {
    let newsDataSearch = this.state.newsData;
    if (this.state.searchInput.length !== '') {
      newsDataSearch.forEach((item, index) => {
        const heading = item.webTitle.toLowerCase();
        const trailText = item.fields.trailText.toLowerCase();
        if (heading.includes(this.state.searchInput) || trailText.includes(this.state.searchInput)) {
          item.show = true;
          newsDataSearch[index].show = true;
        } else {
          newsDataSearch[index].show = false;
        }
      });
      
    } else {
      newsDataSearch.forEach((item, index) => {
        item.show = true
        newsDataSearch[index].show = true;
      });
    }
    this.setState({newsData: newsDataSearch})
  }

  handleClear = (event) => {
    event.preventDefault();
    this.setState({searchInput: ''}, () => this.filterArticles());
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Filter and Highlight</h1>
          <form>
            <label className="search-label" htmlFor="search">Search for a keyword</label>
            <div className="search-input-container">
              <input 
                className="search"
                id="search"
                type="text"
                placeholder="Search..."
                value={this.state.searchInput}
                onChange={this.handleInputChange}  />
              <button 
                className={`search-clear-button ${this.state.searchInput !== '' ? 'search-clear-button__show' : null}`}
                onClick={this.handleClear}>Clear</button>
            </div>
          </form>
        </header>
        <main className="app-main">
          <NewsContainer 
            newsData={this.state.newsData}
            searchTerm={this.state.searchInput} />
        </main>
      </div>
    );
  }
}

export default App;
