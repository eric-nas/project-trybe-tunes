import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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
      } else {
        await removeSong(music);
        const result = await getFavoriteSongs();
        this.setState({
          favoriteMusic: result,
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
      return <div className="spinner-login" />;
    }
    return (
      <div className="music-card">
        {musics.map((music, index) => (music.trackName ? (
          <div key={ index }>
            <p className="music-card-name">
              {music.trackName}
              {' '}
            </p>
            <p>
              <audio
                className="audio"
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <input
                className="checkbox"
                id={ music.trackId }
                onChange={ (event) => this.checkedFavorite(event, music) }
                data-testid={ `checkbox-music-${music.trackId}` }
                type="checkbox"
                name={ index }
                checked={ favoriteMusic.some((item) => item.trackId === music.trackId)
                  ? true : check[index] }
              />
              <label className="heart-checkbox" htmlFor={ music.trackId }> </label>
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
