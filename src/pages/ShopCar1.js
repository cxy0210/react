import React from 'react'
import '../assets/css/ShopCar.css'
import { connect } from 'react-redux';
import * as types from "../store/types"
import { Toast, Button, List, SwipeAction, Stepper } from 'antd-mobile'
import store from "../plugins/redux"


class ShopCar extends React.Component {
	state = {
		val: "",
		
		checkAll: false,
		cart: [],
		totalPrice:0,
		count: 0,
		num:0
	}

	componentDidMount() {
		let cart = this.props.car;
		let totalPrice=this.props.totalPrice
		let count =this.state.count;
		let num = this.state.num
		let checkAll = JSON.parse(window.localStorage.getItem('react_check'))
		// console.log(cart)
		// for (var i = 0; i < cart.length; i++) {
		// 	count
			
		// }
		for (var i = 0; i < cart.length; i++) {
			
			if (cart[i].is_select==true) {
				count += parseInt(cart[i].cart_number);
				
				num +=1
			}
		}
		
		this.setState({
			cart: cart,
			count,
			num	,
			checkAll,
			totalPrice		
		})
	}

	changeItem = (val, index) => {

		let cart = this.props.car
		
		cart[index]["cart_number"] = val;

		this.setState({
			val,
			cart
		})
		store.dispatch({ type: 'CHANGE_ITEM', payload: cart });
		window.localStorage.setItem("react_goods", JSON.stringify(cart))
		this.calcAll()
	}
	//单选
	checkOne = (index,_id) => {
		var cart = this.state.cart;
		
		cart[index].is_select = !cart[index].is_select;

		//            判断全部商品是否被勾选上
		var checkAll = true;
		for (var i = 0; i < cart.length; i++) {
			//                只要有一个没选中就为false
			if (!cart[i].is_select) {
				checkAll = false;
				break;
			}
		}
		this.setState({
			cart: cart,
			checkAll: checkAll,
			
		});
		this.calcAll()
		this.sumAmount();
		window.localStorage.setItem("react_check", JSON.stringify(checkAll))
		window.localStorage.setItem("react_goods", JSON.stringify(cart))
		// window.localStorage.setItem("react_order", JSON.stringify(order))
	}
	//全选
	allCheck = (ev) => {
			
		this.setState({
			[ev.target.name]: ev.target.checked
		});

		var cart = this.state.cart
		var checkAll = !this.state.checkAll

		for (var i = 0; i < cart.length; i++) {
			cart[i].is_select = checkAll;
		}
		this.setState({
			cart: cart,
			checkAll: checkAll
		})
		this.calcAll()
		this.sumAmount();
		console.log(cart)
		window.localStorage.setItem("react_check", JSON.stringify(checkAll))
		window.localStorage.setItem("react_goods", JSON.stringify(cart))
	}
	//	选中商品数量
	sumAmount = () => {
		var count = 0
		var num =0;
		var cart = this.state.cart;
		for (var i = 0; i < cart.length; i++) {
			if (cart[i].is_select) {
				count += parseInt(cart[i].cart_number);
				
				num +=1
			}
		}
		this.setState({
			count: count,
			num:num
		})
	}
	//总价
	calcAll = (ev) => {
		var totalPrice = 0;
		var cart = this.state.cart;
		for (var i = 0; i < cart.length; i++) {
			if (cart[i].is_select) {
				totalPrice += cart[i].price * cart[i].cart_number;
				console.log(totalPrice)
				
			}
		}
		this.setState({
			totalPrice: totalPrice
		});
		//            调用计算选中商品数量
		this.sumAmount();
		store.dispatch({ type: 'TOTAL', payload: totalPrice });
		window.localStorage.setItem("react_price",JSON.stringify(totalPrice))

	}
	// 删除单个

	remove=(index)=>{
		var cart = this.state.cart;
		for (var i = 0; i < cart.length; i++) {
			if(cart[i]==this.state.cart[index]){
				cart.splice(index,1)
				this.calcAll()
			}				 				
			}
			this.setState(
				cart
			)
			window.localStorage.setItem("react_goods",JSON.stringify(cart))
		}
		//删除全部
		removeAll=()=>{
			let cart=this.props.car
			this.setState({
				cart:[]
			})
			store.dispatch({type:"REMOVE_ALL",payload:[]})
			window.localStorage.removeItem('react_goods')
			
		}
		//跳转结算页
		goto=()=>{
			if(this.state.num!=0){
				this.props.history.push("./order")
			}else{
				Toast.fail('亲！请先选择商品', 1);
			}			
		}
	// 渲染
	render() {
		let { car } = this.props
		return (
			<div className="ShopCar">
				<header className="aui-header-default aui-header-fixed aui-header-bg">
					<a className="aui-header-item" onClick={() => { this.props.history.go(-1) }}>
						<i className="aui-icon aui-icon-back-white"></i>
					</a>
					<div className="aui-header-center aui-header-center-clear">
						<div className="aui-header-center-logo">
							<div className="aui-car-white-Typeface">购物车({car.length})</div>
						</div>
					</div>
					<a href="#" className="aui-header-item-icon" style={{ minWidth: 0 }}>
						<i className="aui-icon aui-icon-member"></i>
					</a>
				</header>
				<section className="aui-car-content">
					<div className="aui-car-box">
						<div className="aui-car-box-name">
							<h3>
								总商品数:({this.state.count})
							</h3>
							<div className="aui-car-coupons">
							{
								car.length>0?
								<div style={{display: "flex"}}>
									<i style={{fontSize:16,color:"red"}} onClick={()=>{this.props.history.push('/home')}}>继续选购商品 </i>
									<Button type="warning" size={"small"} style={{marginTop:10,marginLeft:10}} onClick={this.removeAll}>全部删除</Button>
								</div>:
								<div style={{display: "flex"}}>
									<i>购物车没有商品!!! </i>
									<Button type="primary" size={"small"} style={{marginTop:10,marginLeft:10}} onClick={()=>{this.props.history.push('/home')}}>挑选商品</Button>
								</div>
								
							}
								
							</div>
						</div>
						<div className="aui-car-box-list">

							<ul>

								{
									car.map((item, index) => (

										<SwipeAction
											key={index}
											style={{ backgroundColor: 'gray',touchAction: "none"}}
											
											right={[
												{
													text: ' 收 藏 ',
													onPress: () => console.log('cancel'),
													style: { backgroundColor: '#399', color: 'white', padding: '0 15px'},
												},
												{
													text: ' 删 除 ',
													onPress: () => {this.remove(index)},
													style: { backgroundColor: '#F4333C', color: 'white', padding: '0 15px' },
												},
											]}
											onOpen={() => console.log('global open')}
											onClose={() => console.log('global close')}
										>
											<List.Item>
												<li key={item._id}>
													<div className="aui-car-box-list-item">
														<input type="checkbox"  className="check goods-check goodsCheck" checked={this.props.car[index].is_select} onChange={() => { this.checkOne(index,item.goods_id) }} />
														<div className="aui-car-box-list-img" >
															<a href="#">
																<img src={item.banner} style={{ width: 80, height: 80 ,}} alt="" />
															</a>
														</div>
														<div className="aui-car-box-list-text" >
															<h4>
                                                                {/* <a href="#">{item.title}</a> */}
                                                                <a href="#">你好吗</a>
															</h4>
															<div className="aui-car-box-list-text-brief" >
																{/* <span>{item.des}</span>
																<span>分类:{item.cat_three_id}</span> */}
                                                                <span>分类:4123</span>
                                                                <span>重量:1212</span>
															</div>
															<div className="aui-car-box-list-text-price" >
																<div className="aui-car-box-list-text-pri">
																	￥<b className="price">{item.price}</b>
																</div>

																{/* <a href="#" className="minus">-</a>
															<span className="num">{item.cart_number}</span>
															<a  className="plus" onChange={(val,index) => {
                                                    this.onChange({val,index})
                                                }}>+</a> */}
																<Stepper
																	style={{ width: '10%', minWidth: '100px', float: "right", touchAction: "none" }}
																	showNumber
																	min={1}
																	value={item["cart_number"]}
																	onChange={(val) => {
																		this.changeItem(val, index)
																	}}
																/>


															</div>
														</div>

													</div>
												</li>

											</List.Item>


										</SwipeAction>
									)
									)
								}

							</ul>
						</div>
						<div className="aui-shopPrice" onClick={()=>{this.props.history.push('/home')}}>
							找更多相似商品
						</div>
					</div>
				</section>
				<div className="aui-payment-bar">
					<div className="all-checkbox"><input type="checkbox" className="check goods-check" name="AllCheck" checked={this.state.checkAll} onChange={this.allCheck} />全选</div>
					<div className="shop-total">
						<strong>合计：<i className="total" id="AllTotal">{this.state.totalPrice}</i></strong>
					</div>
					<a  className="settlement" onClick={()=>{this.goto()}}>结算({this.state.num})</a>
				</div>




			</div>
		)
	}

}

const mapStateToProps = state => ({
	car: state.shopcar,
	totalPrice:state.totalPrice
});

export default connect(mapStateToProps, null)(ShopCar)