import React, { useState,useRef } from 'react';
import './player.css'
import { Sidebar ,Body, Footer} from '../index'
import { useDataLayerValue } from '../../context/DataLayer';

const Player = ({spotify, playlist}) => {
const [name, setName] = useState('Discover Weekly');
const sidebarTabRef = useRef();
console.log(name)

const onPressTab = (e) => {
  // var titles = document.getElementsByClassName('sidebarOptions__playlistTitle');
  // console.log(e.target.innerText)
  // console.log(titles)
  setName(e.target.innerText)
 // console.log(sidebarTabRef.current)
//sidebarTabRef.current.style.color = 'red';
}

  return (
    <div className='player'>
      <div className="player">
        <div className="player__body">
 <Sidebar playlist={playlist} name={name} tabRef={sidebarTabRef} click={onPressTab}/>
       <Body spotify={spotify} playlist={playlist} name={name}/>
        </div>
      </div>
    <Footer/>
    </div>
  )
}

export default Player