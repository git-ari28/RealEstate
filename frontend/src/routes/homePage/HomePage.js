import React from 'react'
import "./homePage.scss"
import SearchBar from '../../components/searchBar/SearchBar'

const HomePage = () => {
  return (
    <div className='homePage'>
        <div className='textcontainer'>
            <div className='wrapper'>
              <h1 className='title'>
                Real Estate for You</h1> 
                <p>lorem ipsum</p> 
                <SearchBar/>
                <div className='boxes'>
                <div className='box'>
                    <h1>16+</h1>
                    <h2>Years of Experience</h2>
                </div>
                <div className='box'>
                    <h1>16+</h1>
                    <h2>Years of Experience</h2>
                </div>
                <div className='box'>
                    <h1>200</h1>
                    <h2>Awards Gained</h2>
                </div>
                <div className='box'>
                    <h1>12000+</h1>
                    <h2>Properties Rented</h2>
                </div>
                </div>

            </div>
       </div>
       <div className='imgContainer'>
<img src="https://media.istockphoto.com/id/1159873271/photo/residential-area-in-the-city-modern-apartment-buildings.jpg?s=1024x1024&w=is&k=20&c=1gbLy7yUxgRLnK1H4zMIUi08Vsg62Ye_s0jOmDMWYq0=" alt=""/>
       </div>
        



    </div>
  )
}

export default HomePage