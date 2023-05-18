import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    load: false,
    check: {
      0: false,
    },
  };

  checkedFavorite = async (event) => {
    const { type, checked, value, name } = event.target;
    const values = type === 'checkbox' ? checked : value;
    this.setState((prevState) => ({
      check: {
        ...prevState.check,
        [name]: values,
      },
      load: true,
    }));
    const { musics } = this.props;
    await addSong(musics);
    this.setState({
      load: false,
    });
  };

  render() {
    const { musics } = this.props;
    const { load, check } = this.state;
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
                  onChange={ this.checkedFavorite }
                  data-testid={ `checkbox-music-${music.trackId}` }
                  type="checkbox"
                  name={ index }
                  checked={ check[index] }
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
