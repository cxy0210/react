import React, { userEffect } from 'react';
import './Swiper.css';

import $ from 'jquery';
import Swipe from '../../library/swipe';

import { Link } from 'react-router-dom'

export default function ({ data, dataName }) {
  let initSwiper = () => {
    new Swipe($('.banner')[0], {
      auto: 2000,
      continuous: true,
      stopPropation: true,
      callback: function (index, element) {
        $('.banner ol li').removeClass('active');
        $('.banner ol li').eq(index).addClass('active');
      }
    })
  };
  // userEffect(()=>initSwiper())
  userEffect(initSwiper)
  return (
    <div className="banner">
      <ul className="clearfix">

        {
          data.map(item => (
            <li
              key={item.id}
            >
              <Link to={`/detail/${item.id}?dataName=banner`}>
                <img src={item.banner} alt="" />
                <div className="text-box">
                  <h2>{item.title}</h2>
                  <p>{item.sub_title}</p>
                </div>
              </Link>
            </li>
          ))
        }


      </ul>

    </div>
  )

}
