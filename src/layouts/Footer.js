import React from 'react';
import style from '../assets/css/Footer.module.css';

import { NavLink } from 'react-router-dom'

export default()=>(
  <div className={style['foot-btn']}>
        <ul>
        <NavLink to="/home" activeClassName={style.home_active}><li className={style.home}>首页</li></NavLink>
          <NavLink to="/sort" activeClassName={style.home_active}><li className={style.sort}>分类</li></NavLink>
          <NavLink to="/shopcar" activeClassName={style.write_active}><li className={style.write}>购买</li></NavLink>
          <NavLink to="/user" activeClassName={style.my_active} ><li className={style.my}>用户</li></NavLink>
        </ul>


        {/* <div className={style['aaa']}></div> */}
      </div>
)

// export default class Footer extends React.Component {
//   render() {
//     return (
//         // console.log(111),
        
//       <div className={style['foot-btn']}>
//         <ul>
//         <NavLink to="/home" activeClassName={style.home_active}><li className={style.home}>首页</li></NavLink>
//           <NavLink to="/sort" activeClassName={style.home_active}><li className={style.sort}>分类</li></NavLink>
//           <NavLink to="/shopcar" activeClassName={style.write_active}><li className={style.write}>购买</li></NavLink>
//           <NavLink to="/user" activeClassName={style.my_active} ><li className={style.my}>用户</li></NavLink>
//         </ul>


//         {/* <div className={style['aaa']}></div> */}
//       </div>
//     )
//   }
// }