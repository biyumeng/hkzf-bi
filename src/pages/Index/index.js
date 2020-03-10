import React, { Component } from 'react';

//引入走马灯
import { Carousel , Flex } from 'antd-mobile';

import { getSwiper } from '../../utils/api/home'
import {BASE_URL} from '../../utils/axios'
// import { log } from 'util';

//导入首页样式
import './index.css'

import navs from '../../utils/navs_config'

class Index extends Component {
    state = {
        //轮播图数据
        swiper: [],
        //处理调用后端接口后轮播图不自动播放问题
        autoPlay:false,
        //轮播图高度
        imgHeight: 212,
      }
      componentDidMount() {
        this.getSwiper()
      }

      //获取轮播图数据
      getSwiper = async()=>{
        const {data,status} = await getSwiper()
        // console.log(res);
        // const {body,status} = res
        if(status === 200 ){
            this.setState({
                swiper:data
            },()=>{
                //因为是异步的，所以有数据后再设置自动播放
                this.setState(({
                    autoPlay:true
                }))
            })
        }
      }

      //渲染轮播图
      renderSwiper=()=>{
          return this.state.swiper.map(val => (
            <a
              key={val.id}
              href="http://www.baidu.com"
              style={{ display: 'inline-block', width: '100%', background: 'gray' , height: this.state.imgHeight }}
            >
              <img
                src={`${BASE_URL}${val.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  //窗口自适应
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))
      }

      //渲染栏目导航
      renderNavs=()=>{
          return navs.map((item) => {
            return  <Flex.Item onClick={() =>this.props.history.push(item.path)} key={item.id}>
                  <img src={item.img} />
                  <p>{item.title}</p>
              </Flex.Item>
          }) 
      }

      render() {
        return (
          <div>

            {/* 轮播图 */}
            <Carousel
                //自动播放
              autoplay={this.state.autoPlay}
                //循环播放
              infinite
            >
              {/* 列表渲染 */}
              {
                  this.renderSwiper()
              }
            </Carousel>
          
            {/* 栏目导航 */}
            <Flex className="nav">
                {
                    this.renderNavs()
                }
                
            </Flex>

          </div>
        );
      }
}

export default Index;