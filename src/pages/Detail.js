import React from 'react';
import '../assets/css/Detail.css';
import querystring from 'query-string'
import {NavLink} from 'react-router-dom'
import {Carousel, Message} from 'element-react';
import 'element-theme-default';
// import {upPublic} from "../store/actions";
import connect from "react-redux/es/connect/connect";
import { addToCart } from '../store/actions'
import * as types from "../store/types";
import {update} from "../store/actions";
import { Toast } from 'antd-mobile';

class Detail extends React.Component {

    state = {
        detail: {}
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        let dataName = querystring.parse(this.props.location.search).dataName;
        
        this.props.getDetail(dataName,id)
    }
    // componentDidMount(){
    //     let id=this.props.match.params.id;
    //     let dataName=querystring.parse(this.props.location.search).dataName;
    
    //     console.log(id,dataName);
    
    //     this.props.getDetail(dataName,id)
    //   }
  
 
    render() {
        
        let {shopcar,detail} = this.props;
        // let {detail} = this.state;
        console.log(detail);
        
        // let {detail} = this.props;
        // console.log(detail);
        let mockStyleStr = '<span style="background:red">xxx</span>';

        let el=null;
        if(detail){
            // console.log(this.state.detail.detail_banner);
            el=(
                <div className="Detail">
                             <Carousel interval="3000" arrow="always">
                                 {
                                     [1, 2,].map((item, index) => {
                                         return (
                                             <Carousel.Item key={index}>
                                                 <h3>{item}</h3>
                                             </Carousel.Item>
                                         )
                                     })
                                 }
                             </Carousel>
                             <div  className="body" >
                                 <p className= "a">{detail.title}</p>
                                 <p className= "b">￥：{detail.price}</p>
                                 <p className= "c">{detail.des}</p>
                                 <img src={detail.detail_banner}/>
                                 <img src={detail.detail_banner}/>
                                 </div>
                             <div className="foot">
                                 <ul>
                                    <NavLink to="/home"><li className="home"></li></NavLink>
                                    <li className="sort" onClick={()=>{this.props.add2(detail,shopcar,this.props)}}></li>
                                    <li className="add"  onClick={()=>{this.props.add1(detail,shopcar,this.props)}}  type="success" style={{marginLeft:80,width:160,}}><span>加入购物车</span></li>
                                 </ul>
                             </div>
                         </div> 
            )
        }else{
            el = <div>骨架屏</div>
        }
        return el;
    }
}



// const initMapStateToProps = (state) =>{
//     return {
//         detail:state.detail,
//     }
// }

const mapStateToProps=state=>({
    detail: state.detail,
    shopcar:state.shopcar
  });
  const mapDispatchToProps=dispatch=>({
	
	getDetail:(api,id)=>dispatch(update({
		api,
		type:types.UPDATE_DETAIL,
		id
	})),
	add1:(detail,shopcar,props)=>{
		let local = window.localStorage.getItem('react_news_app_uid') 
		if(local){
			let find = false;
        shopcar.forEach((item,index)=>{
          if(item.id==detail.id){
            item.cart_number++ //数量增加
            find=true;            
          }
        });
        if(!find){
          detail.cart_number=1
          shopcar.push(detail)
          console.log(detail);
          
		}
		dispatch({type:"ADD_SHOPCAR",payload:shopcar})
		Toast.success('添加商品成功', 1);
		console.log(shopcar)
		window.localStorage.setItem('react_goods',JSON.stringify(shopcar))
		}else{
			Toast.fail('亲！请先登录', 1);
			setTimeout(()=>{
				props.history.push('/login')
			},1000)
		}	
	},
	add2:(detail,shopcar,props)=>{
		let local = window.localStorage.getItem('react_news_app_uid') 
		if(local){
			let find = false;
        shopcar.forEach((item,index)=>{
          if(item.id==detail.id){
            item.cart_number++ //数量增加
            find=true;            
          }
        });
        if(!find){
          detail.cart_number=1
          shopcar.push(detail)
		}
		dispatch({type:"ADD_SHOPCAR",payload:shopcar})
		props.history.push('/Shopcar')
		console.log(shopcar)
		window.localStorage.setItem('react_goods',JSON.stringify(shopcar))
		}else{
			Toast.fail('亲！请先登录', 1);
			setTimeout(()=>{
				props.history.push('/login')
			},1000)
		}	
	}
});
// const initMapDispatchToProps=dispatch=>({
//     getDetail:(api,id)=>dispatch(update({
//       api,
//       type:types.UPDATE_DETAIL,
//       id
//     }))
//   });
// const initMapDispatchToProps = (dispatch) => {
    
//     return {
        
//         getDetail: (id,dataName)=>{
//             upPublic(dispatch,id,dataName)
//         }
//     }
// };
export default connect(mapStateToProps,mapDispatchToProps)(Detail)