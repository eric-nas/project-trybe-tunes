import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../Components/MusicCard';

class Favorites extends React.Component {
  state = {
    load: false,
    MusicFavorite: [],
  };

  async componentDidMount() {
    this.setState({
      load: true,
    });
    const result = await getFavoriteSongs();
    this.setState({
      load: false,
      MusicFavorite: result,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { load } = this.state;
    if (prevState.load !== load) {
      this.setState({
        load: true,
      });
      const result = await getFavoriteSongs();
      this.setState({
        load: false,
        MusicFavorite: result,
      });
    }
  }

  render() {
    const { load, MusicFavorite } = this.state;
    if (load) {
      <p>Carregando...</p>;
    }
    return (
      <div data-testid="page-favorites">
        <MusicCard musics={ MusicFavorite } />
      </div>
    );
  }
}

export default Favorites;
