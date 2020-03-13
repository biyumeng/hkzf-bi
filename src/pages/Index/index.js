import React, { Component } from 'react';

//引入走马灯
import { Carousel , Flex , Grid , WingBlank , SearchBar } from 'antd-mobile';

//首页接口
import { getSwiper , getGroup , getNews } from '../../utils/api/home'
//城市信息接口
// import { getCityInfo } from '../../utils/api/city';
import { getCurrCity } from '../../utils';

import {BASE_URL} from '../../utils/axios'
// import { log } from 'util';

//导入首页样式
import './index.scss'

import navs from '../../utils/navs_config'


class Index extends Component {
    state = {
        //顶部搜索关键词
        keyword:'',
        //最新资讯数据
        news: [],
        //宫格数据
        grid:[],
        //轮播图数据
        swiper: [],
        //处理调用后端接口后轮播图不自动播放问题
        autoPlay:false,
        //轮播图高度
        imgHeight: 212,
        //当前城市数据
        currCity:{
          label:"--",
          value:''
        }
      }
      componentDidMount() {
        //代码多余，用Promise.all统一处理
        // this.getSwiper()
        // this.getGroup()
        // this.getNews()
        this.getAllData()
        this.getCurrCity()
      }

      //获取当前城市
      getCurrCity = async ()=>{
          let res =await getCurrCity();
          this.setState({
            currCity:res
          })
      }

      //使用Promise.all统一处理首页首页接口调用
      getAllData = async ()=>{
        const res = await Promise.all([getSwiper() , getGroup() , getNews()]);
        if ( res[0].status === 200 ) {
          this.setState({
            swiper:res[0].data,
            grid:res[1].data,
            news:res[2].data
          },()=>{
            //因为是异步的，所以有轮播图数据（也就是res[0]）获取后再设置自动播放
                this.setState(({
                    autoPlay:true
                }))
            }
          )
        }
      }

      // //获取轮播图数据
      // getSwiper = async()=>{
      //   const {data,status} = await getSwiper()
      //   // console.log(res);
      //   // const {body,status} = res
      //   if(status === 200 ){
      //       this.setState({
      //           swiper:data
      //       },()=>{
      //           //因为是异步的，所以有数据后再设置自动播放
      //           this.setState(({
      //               autoPlay:true
      //           }))
      //       })
      //   }
      // }

      // //获取租房小组数据
      // getGroup = async()=>{
      //   const {data,status} = await getGroup()
      //   // console.log(data,status);
      //   if(status===200){
      //     this.setState({
      //       grid:data
      //     })
      //   }
      // }

      // //获取首页最新资讯
      // getNews = async()=>{
      //   const {data,status} = await getNews()
      //   // console.log(data,status);
      //   if(status===200){
      //     this.setState({
      //       news:data
      //     })
      //   }
      // }

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

      // 渲染最新资讯
      renderNews() {
        return this.state.news.map(item => (
          <div className="news-item" key={item.id}>
            <div className="imgwrap">
              <img
                className="img"
                src={`${BASE_URL}${item.imgSrc}`}
                alt=""
              />
            </div>
            <Flex className="content" direction="column" justify="between">
              <h3 className="title">{item.title}</h3>
              <Flex className="info" justify="between">
                <span>{item.from}</span>
                <span>{item.date}</span>
              </Flex>
            </Flex>
          </div>
        ))
      }

      // 渲染顶部导航
      renderTopNav = () => {
        const { push } = this.props.history;
        return (
          <Flex justify="around" className="topNav">
            <div className="searchBox">
              <div className="city" onClick={()=>push('/cityList')}>
                {this.state.currCity.label}<i className="iconfont icon-arrow" />
              </div>
              <SearchBar
                value={this.state.keyword}
                onChange={(v) => this.setState({ keyword: v })}
                placeholder="请输入小区或地址"
              />
            </div>
            <div className="map"  onClick={()=>push('/map')}>
              <i key="0" className="iconfont icon-map" />
            </div>
          </Flex>
        )
      }

      render() {
        return (
          <div>
            {/* 顶部导航 */}
            {
              this.renderTopNav()
            }

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

            {/* 租房小组 */}
            <div className="group">
                {/* 标题title */}
                <Flex className="group-title" justify="between">
                  <h3>租房小组</h3>
                  <span>更多</span>
                </Flex>    

                {/* 宫格布局   */}
                     {/* 宫格数据 */}
                <Grid data={this.state.grid}
                  square={false}
                  hasLine={false}
                  //宫格列数
                  columnNum={2}
                  //自定义宫格内容
                  renderItem={dataItem => (
                    <Flex className="grid-item" justify="between">
                      <div className="desc">
                        <h3>{dataItem.title}</h3>
                        <p>{dataItem.desc}</p>
                      </div>
                      <img src={`${BASE_URL}${dataItem.imgSrc}`} alt="" />
                    </Flex>
                  )}
                />
            </div>

            {/* 最新资讯 */}
            <div className="news">
              <h3 className="group-title">最新资讯</h3>
              <WingBlank size="md">{this.renderNews()}</WingBlank>
            </div>


          </div>
        );
      }
}

export default Index;