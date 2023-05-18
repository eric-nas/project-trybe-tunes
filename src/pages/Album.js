import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  state = {
    artistName: '',
    collectionName: '',
    resultApi: [],

  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const resultApi = result;
    this.setState({ resultApi }, () => this.setState({
      artistName: result[0].artistName,
      collectionName: result[0].collectionName,
    }));
    console.log(result);
  }

  render() {
    const { artistName, collectionName, resultApi } = this.state;
    return (
      <div data-testid="page-album">
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h1 data-testid="album-name">{collectionName}</h1>
        <MusicCard musics={ resultApi } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
