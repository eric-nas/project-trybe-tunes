import React from 'react';

class Search extends React.Component {
  state = {
    artist: '',
    button: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const { artist } = this.state;
    if (prevState.artist !== artist && artist.length > 1) {
      this.setState({
        button: false,
      });
    } if (prevState.artist !== artist && artist.length < 2) {
      this.setState({
        button: true,
      });
    }
  }

  handlerInput = (event) => {
    const { name, type, value, checked } = event.target;
    const values = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: values,
    });
  };

  render() {
    const { artist, button } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <input
            name="artist"
            value={ artist }
            onChange={ this.handlerInput }
            data-testid="search-artist-input"
          />
          <button
            data-testid="search-artist-button"
            disabled={ button }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
