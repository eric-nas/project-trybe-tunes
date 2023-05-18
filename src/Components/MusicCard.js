import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    load: false,
    check: {
      0: false,
    },
    favoriteMusic: [],
  };

  async componentDidMount() {
    const results = await getFavoriteSongs();
    this.setState({
      load: false,
      favoriteMusic: results,
    });
  }

  checkedFavorite = async (event, music) => {
    const { type, checked, value, name } = event.target;
    const values = type === 'checkbox' ? checked : value;
    this.setState((prevState) => ({
      check: {
        ...prevState.check,
        [name]: values,
      },
      load: true,
    }));

    try {
      if (checked) {
        await addSong(music);
        this.setState({
          load: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({
      load: false,
    });
  };

  render() {
    const { musics } = this.props;
    const { load, check, favoriteMusic } = this.state;
    if (load) {
      return <p>Carregando...</p>;
    }
    return (
      <div>
        {musics.map((music, index) => (index > 0 ? (
          <div key={ index }>
            <p>
              {music.trackName}
              {' '}
            </p>
            <p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="Favorita">
                <input
                  onChange={ (event) => this.checkedFavorite(event, music) }
                  data-testid={ `checkbox-music-${music.trackId}` }
                  type="checkbox"
                  name={ index }
                  checked={ favoriteMusic.some((item) => item.trackId === music.trackId)
                    ? true : check[index] }
                />
              </label>
              {' '}
            </p>
          </div>) : <p key={ index } />))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
