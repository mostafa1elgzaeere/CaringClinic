import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faFacebookF } from '@fortawesome/free-brands-svg-icons';

import Swal from 'sweetalert2';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import axios from "axios"

// import required modules
import { Pagination,EffectCoverflow } from "swiper";

function Doctors() {

    let [doctors, setDoctors] = useState([])
    let [loading,setLoading]=useState(true)

    const fetch = async () => {
        await axios.get(`https://caringapi.herokuapp.com/api/doctors/`) .then((response) => {
            setDoctors(response.data);
        })

        setLoading(false)
    }

    useEffect(() => {
        fetch()
    },[])

    
    let [info,setInfo]=useState(true)

setTimeout(()=>{
    setInfo(false)
},2000)


    let open_modal = ({phone}) => {
        Swal.fire({
            title:"Mobile Phone" ,
            text: `${phone}`,

        })
    }


    return (
        <div class="page-section" style={{"minHeight":"700px"}}>
            <div class="container"></div>
            <h1 class="text-center mb-3 wow fadeInUp">Our Doctors</h1>
            <div className='row d-flex justify-content-center text-center'>
                    {info?<p className='alert alert-success col-11 col-md-3'>Swipe to see All Doctors </p>:
                    <p className='alert alert-success col-11 col-md-3 invisible'>Swip to see All Doctors </p>}

                    </div>


{loading?
<div className='d-flex justify-content-center'>
    <div className="spinner-grow text-dark text-secondary"style={{"color":"gray"}}  role="status">
  </div>
</div>:

<Swiper
effect={"coverflow"}
grabCursor={true}
centeredSlides={true}
slidesPerView={"auto"}
coverflowEffect={{
  rotate: 150,
  stretch: 0,
  depth: 100,
  modifier: 1,
  slideShadows: false,
}}
pagination={true}
modules={[EffectCoverflow, Pagination]}
className="mySwiper"
>

          
        {doctors.map(item => 
                <SwiperSlide>
              
                    <div class="item mb-5">
                        <div class="card-doctor">
                            <div class="header">
                                <img src={item.image} alt="true" height={300} />
                                <div class="meta">
                                    <a href="#" onClick={()=>open_modal(item)}><span class="mai-call"><FontAwesomeIcon icon={faPhone} color="#00D9A5"/></span></a>
                                    <a href={item.email} target="_blank"><span class="mai-logo-whatsapp"><FontAwesomeIcon icon={faFacebookF} color="#00D9A5" /></span></a>
                                </div>
                            </div>
                            <div class="body">
                                <p class="text-xl mb-0">Dr. {item.name}</p>
                                <span class="text-sm text-grey">{item.category}</span>
                            </div>
                        </div>
                    </div>
                  

                </SwiperSlide>
                  )}

            


           



    </Swiper>

}


            <div />
        </div>
    );
}
export default Doctors;