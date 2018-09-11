import * as React from 'react';
import ContextMenu from './context_menu';
import Player from '../services/player.js';
import autobind from 'autobind-decorator';

class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
    Player.addOnSongChangeListener(this.newSong);
    this.state = {
      hideCover: false,
      song: Player.currentSong
    };
  }

  hideCover(hide) {
    this.setState({hideCover: hide});
    return false;
  }

  @autobind
  newSong(song) {
    this.setState({
      song: song
    });
  }

  render() {
    if (this.state.song) {
      return (
        <div className='playerinfo' onContextMenu={this.rightSongClick}>
          <div className='info'>
            <p className='title' title={this.state.song.title}>{this.state.song.title}</p>
            <p className='artist'>{this.state.song.artist} - {this.state.song.album}</p>
          </div>
          { (!this.state.hideCover) ?
          <div className='cover-wrapper'>
            <div className='cover' style={{'backgroundImage': `url('${this.state.song.cover}')`}}></div>
            <div key='hide' className='btn btn-default btn-sm hide-button' onClick={this.hideCover.bind(this, true)}>
              <i className='fa fa-angle-down' aria-hidden='true'></i>
            </div>
          </div>
          : <div key='show' className='btn btn-default btn-xs show-button' onClick={this.hideCover.bind(this, false)}>
              <i className='fa fa-angle-up' aria-hidden='true'></i>
            </div>
          }
        </div>
      );
    } else {
      return <div className='playerinfo' />;
    }
  }

  @autobind
  rightSongClick(event) {
    ContextMenu.open(this.state.song, event, Player.playlist);
    event.preventDefault();
  }
}

module.exports = PlayerInfo;