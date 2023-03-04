import React from 'react'
import './sidebarOptions.css'

function SidebarOptions({ title, Icon,tabRef,id,...props}) {
  return (
    <div className='sidebarOptions'>
        {
            Icon && <Icon className='sidebarOptions__icon' />
        }
        {
            Icon ? <h4>{title}</h4> : <p className='sidebarOptions__playlistTitle' onClick={props.click}>{title}</p>
        }
        </div>
  )
}

export default SidebarOptions