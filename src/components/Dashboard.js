import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    let user = JSON.parse(localStorage.getItem('details'));
  return (
    <div>
      {
        localStorage.getItem('details')?
        <>
          <h2>Welcome {user['first_name']} </h2>
            {/* <div id="carouselExampleFade" class="carousel slide carousel-fade">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="" class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src="..." class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src="..." class="d-block w-100" alt="..." />
                </div>
                </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div> */}
          <div>
            body 
          </div>
          <footer>
            <div>
              my account : <Link to="/dashboard/account">click here</Link>
            </div>  
          </footer>
          
        </>
        :
        null
      }
      
    </div>
  )
}

export default Dashboard
