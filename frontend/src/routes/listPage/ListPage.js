import React from 'react'
import {ListData} from "../../lib/dummydata"
import "./listPage.scss"

const ListPage = () => {

  const data=ListData
  return (
    <>
    <div className='listPage'>
    <div className='listcontainer'>
      <div className='wrapper'></div>
    </div>
    <div classNmae="mapcontainer">Map</div>
    </div>
    </>
  )
}

export default ListPage