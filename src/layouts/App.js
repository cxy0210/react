import React,{useEffect} from 'react';
import { Route,Redirect,Switch } from 'react-router-dom'
import '../assets/css/App.css';

import Footer from "./Footer";
import Home from "../pages/Home";
import ShopCar from "../pages/ShopCar";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import User from "../pages/User";
import Reg from "../pages/Reg";
import Sort from "../pages/Sort";
import Auth from "../guard/Auth";
import ErrorPage from "../pages/ErrorPage";
import Loading from "../components/loading/Loading";
// import pubsub from 'pubsub-js';
import * as types from '../store/types'
import {connect} from 'react-redux';



// class App extends React.Component{
//     state={};
//       // constructor(props){
//       //   super();
    
//         // 订阅
//       //   pubsub.subscribe('UPDATE_LOADING',(mess,data)=>{
    
//       //     // data==true/false
//       //     this.setState({bLoading:data});
    
//       //   });
    
//       // }
    
//       static getDerivedStateFromProps(nextProps,nextState){
//         let {viewFoot,location:{pathname}} = nextProps;
//         // let path = nextProps.location.pathname;
//         // console.log(nextProps);
        
//         if (/home|user|sort/.test(pathname)){
//           // console.log(1);
//           viewFoot(true);
//           // return {bFoot:true}
          
//         }
//         if (/detail|login|reg|shopcar/.test(pathname)){
//           // return {bFoot:false}
//           viewFoot(false);
//           // console.log(2);
//         }
//         return null;
    
//       }
//     render(){
//         let {bFoot,bLoading} =this.props;
//         return(
//             <div className = "App">
//                 {bLoading && <Loading/>}

//                 <Switch>
//                     <Route path="/home" component={Home} />
//                     <Auth path="/shopcar" component={ShopCar} />
//                     <Route path="/detail/:id" component={Detail} />
//                     <Route path="/login" component={Login} />
//                     {/* <Route path="/user" component={User} /> */}
//                     <Auth path="/user" component={User} />
//                     <Route path="/reg" component={Reg} />
//                     <Route path="/Sort" component={Sort} />
//                     <Redirect exact from="/" to = "/home" />
//                     <Route component={ErrorPage} />
                    
//                 </Switch>
//                 {/* <Footer/> */}
//                  {bFoot ? <Footer/> : null}
                
//             </div>
//         )
//     }
// }

const initMapStateToProps = state => ({
  bFoot:state.bFoot,
  bLoading:state.bLoading
});

const initMapDispatchToProps = dispatch => ({
  viewFoot:(bl)=>dispatch({type:types.VIEW_FOOT,payload:bl}),
});



export default connect(initMapStateToProps,initMapDispatchToProps)(
  function App ({bFoot,bLoading,viewFoot,location:{pathname}}){
  useEffect(()=>{
      // let {viewFoot,location:{pathname}} = nextProps;
      if (/home|user|sort/.test(pathname)){
        viewFoot(true);
      }
      if (/detail|login|reg|shopcar/.test(pathname)){  
        viewFoot(false);
      }
  })
  return(
    <div className = "App">
                {bLoading && <Loading/>}

                <Switch>
                    <Route path="/home" component={Home} />
                    <Auth path="/shopcar" component={ShopCar} />
                    <Route path="/detail/:id" component={Detail} />
                    <Route path="/login" component={Login} />
                    {/* <Route path="/user" component={User} /> */}
                    <Auth path="/user" component={User} />
                    <Route path="/reg" component={Reg} />
                    <Route path="/Sort" component={Sort} />
                    <Redirect exact from="/" to = "/home" />
                    <Route component={ErrorPage} />
                    
                </Switch>
                {/* <Footer/> */}
                 {bFoot ? <Footer/> : null}
                
            </div>
  )
})