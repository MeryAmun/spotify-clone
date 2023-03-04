import React from 'react';
import './songRow.css'

const SongRow = ({track, playSong,id,...props}) => {
  return (
    <div className='songRow' onClick={props.onClick}>
      <img src={track?.album?.images[0]?.url} alt=""  className='songRow__image'/>
      <div className="songRow__info">
        <h1>{track?.name}</h1>
        <p>{
          track?.artists?.map((artist) =>artist?.name).join(", ")}
          {track?.album?.name}
          </p>
      </div>
    </div>
  )
}

export default SongRow