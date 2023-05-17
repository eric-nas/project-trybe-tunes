import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
      return <p>...Carregando</p>;
    }
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
            onClick={ this.searchArtist }
          >
            Pesquisar
          </button>

          {!request ? <p>Nenhum álbum foi encontrado</p> : (
            <div>
              <h2>{`Resultado de álbuns de: ${artistName}`}</h2>
              {resultApi.map((result) => (
                <div key={ result.collectionId }>
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
            </div>)}
        </form>
      </div>

    );
  }
}

export default Search;
