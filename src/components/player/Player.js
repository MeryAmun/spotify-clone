import React from 'react';
import './player.css'
import { Sidebar ,Body, Footer} from '../index'

const Player = ({spotify}) => {
  return (
    <div className='player'>
      <div className="player">
        <div className="player__body">
 <Sidebar/>
       <Body/>
        </div>
      </div>
    <Footer/>
    </div>
  )
}

export default Player