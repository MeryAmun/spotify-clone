import React from 'react';
import { useDataLayerValue } from '../../context/DataLayer';
import './body.css'
import Header from './Header';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SongRow } from '../index'

const Body = ({spotify}) => {
 const [{discover_weekly}, dispatch ] = useDataLayerValue();
 console.log(discover_weekly?.description)
  return (
    <div className='body'>
      <Header spotify={spotify}/>
      <div className="body__info">
        <img src={discover_weekly?.images[0]?.url} alt="discover weekly" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
<PlayCircleIcon className='body__shuffle'/>
<FavoriteIcon className='' fontSize='large'/>
<MoreHorizIcon className=''/>
        </div>
        {/* songs */}
        {
          discover_weekly?.tracks?.items?.map(({track},index) => (
            <SongRow track={track} key={index}/>
          ))
        }
      </div>
    </div>
  )
}

export default Body