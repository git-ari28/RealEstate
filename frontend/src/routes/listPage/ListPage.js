import React from 'react'
import {ListData} from "../../lib/dummydata"
import "./listPage.scss"

import Filter from "../../components/filter/filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/map"
const ListPage = () => {

  const data=ListData;
  return (
    <>
    <div className='listPage'>
    <div className='listcontainer'>
      <div className='wrapper'></div>
      <Filter/>
      {data.map(item=>(
        <Card key={item.id} item={item}/>
      ))
      }
    </div>
    <div className="mapcontainer">
      <Map items={data}/>
    </div>
    </div>
    </>
  )
}

export default ListPage