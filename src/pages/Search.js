import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../Components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    button: true,
    search: false,
    artistName: [],
    resultApi: [],
    request: true,
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

  searchArtist = async () => {
    const { artist } = this.state;
    this.setState({
      search: true,
      request: true,
      artistName: artist,
    });
    try {
      const result = await searchAlbumsAPI(artist);
      if (result.length > 0) {
        const resultApi = result;
        this.setState({ resultApi }, () => this.setState({
          search: false,
          artist: '',
        }));
      } else {
        this.setState({
          search: false,
          request: false,
          artist: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  handlerInput = (event) => {
    const { name, type, value, checked } = event.target;
    const values = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: values,
    });
  };

  render() {
    const { artist, button, search, artistName, resultApi, request } = this.state;
    if (search) {
      return <div className="spinner-pages" />;
    }
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              name="artist"
              value={ artist }
              onChange={ this.handlerInput }
              data-testid="search-artist-input"
            />
            <button
              className="search-button"
              data-testid="search-artist-button"
              disabled={ button }
              onClick={ this.searchArtist }
            >
              Pesquisar
            </button>
          </div>

          {!request ? <h3 className="no-search">Nenhum álbum foi encontrado</h3> : (
            <div>
              <h1 className="result-search">
                { artistName.length >= 1 ? `Resultado de álbuns de: ${artistName}` : ''}
              </h1>
              <div className="album-container">
                {resultApi.map((result) => (
                  <div className="albuns" key={ result.collectionId }>
                    <img src={ result.artworkUrl100 } alt="album" />
                    <p>{ result.collectionName }</p>
                    <h3>{ result.artistName }</h3>
                    <Link
                      to={ `/album/${result.collectionId}` }
                      data-testid={ `link-to-album-${result.collectionId}` }
                    >
                      Link
                    </Link>
                  </div>))}
              </div>
            </div>)}
        </form>
      </div>

    );
  }
}

export default Search;
