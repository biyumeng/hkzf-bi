import React, { Component } from 'react';

//引入走马灯
import { Carousel } from 'antd-mobile';

import axios , {BASE_URL} from '../../utils/axios'
// import { log } from 'util';

class Index extends Component {
    state = {
        //轮播图数据
        swiper: [],
        //轮播图高度
        imgHeight: 176,
      }
      componentDidMount() {
        this.getSwiper()
      }

      //获取轮播图数据
      getSwiper = async()=>{
        const res = await axios.get('/home/swiper')
        // console.log(res.data.body);
        const {body,status} = res.data
        if(status === 200 ){
            this.setState({
                swiper:body
            })
        }
      }

      render() {
        return (
          <div>
            <Carousel
                //自动播放
              autoplay={true}
                //循环播放
              infinite
            >
              {/* 列表渲染 */}
              {this.state.swiper.map(val => (
                <a
                  key={val.id}
                  href="http://www.itheima.com"
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
              ))}
            </Carousel>
          </div>
        );
      }
}

export default Index;