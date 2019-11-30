import React from 'react';
import '../assets/css/Home.css';
import Cell from "../components/cell/Cell";
import {connect} from 'react-redux';
import {update} from '../store/actions';
import * as types from '../store/types'


import { Carousel } from 'element-react';
import 'element-theme-default';
import state from '../store/state';


class Home extends React.Component {

    constructor(props){
        super();
        props.getHome();
        
    }
    render(){
        let {home} = this.props;
        return(
            <div className="demo-4 medium Home">
                <Carousel interval="3000" arrow="always">
                    {
                        [1,2,3,4,].map((item, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <h3>{item}</h3>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
                {
          home.map(item=>(
            <Cell key={item.id} item={item} dataName="home"/>
          ))
        }
            </div>
        )
    }
} 



const initMapStateToProps=state=>({
    home:state.home
});
const initMapDispatchToProps=dispatch=>({
    getHome:()=>{
        dispatch({type:'CLEAR_HOME'});
        dispatch(update({
            api:'home',
            type:types.UPDATE_HOME
        }))
    },
})

export default connect(initMapStateToProps,initMapDispatchToProps)(Home)







    // async componentDidMount() {
    //     let res = await React.axios({
    //         url: '/mock/home',
    //         params: {
    //             _page: 1,
    //             _limit: 10
    //         }
    //     });
    //     this.setState({
    //         list: res.data.data
    //     });
    // }




    // render() {
    //     let {list}=this.state;
    //     // let {banner}=this.state;
    //     return (

    //         <div className="demo-4 medium Home">
    //             {/* <Swiper/> */}
    //             <Carousel interval="3000" arrow="always">
    //                 {
    //                     [1,2,3,4,].map((item, index) => {
    //                         return (
    //                             <Carousel.Item key={index}>
    //                                 <h3>{item}</h3>
    //                             </Carousel.Item>
    //                         )
    //                     })
    //                 }
    //             </Carousel>
    //             {
    //       list.map(item=>(
    //         <Cell key={item.id} item={item} dataName="home"/>
    //       ))
    //     }
    //         </div>

        // )
    // }
// }