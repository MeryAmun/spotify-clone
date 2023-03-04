import React, { useState } from 'react';
import './player.css'
import { Sidebar ,Body, Footer} from '../index'
import { useDataLayerValue } from '../../context/DataLayer';

const Player = ({spotify, playlist}) => {
const [name, setName] = useState('Discover Weekly')


const onPressTab = () => {

}

  return (
    <div className='player'>
      <div className="player">
        <div className="player__body">
 <Sidebar playlist={playlist} name={name}/>
       <Body spotify={spotify} playlist={playlist} name={name}/>
        </div>
      </div>
    <Footer/>
    </div>
  )
}

export default Player