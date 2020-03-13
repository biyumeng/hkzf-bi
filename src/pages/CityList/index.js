//城市列表

import React, { Component } from 'react';
//城市列表数据
import { getCityList , getHotCity } from '../../utils/api/city';
//当前定位城市数据
import { getCurrCity , setLocalData , CURR_CITY} from '../../utils';
//导入列表组件库
import { List , AutoSizer } from 'react-virtualized';
import { NavBar , Icon, Toast } from 'antd-mobile'

import './index.scss'

// const list = Array.from(new Array(100)).map((item,index)=>index)


class CityList extends Component {
    //设置状态数据
    state = {
        //城市列表索引
        cityIndex: [],
        //城市归类
        cityList: {},
        // 当前位置的索引,激活索引样式状态
        activeIndex: 0
    }

    //格式化key
    formatLetter=(letter)=>{
        switch (letter) {
            case 'hot':
              return '热门城市';
            case 'curr':
              return '当前城市';
            default:
                //转大写
              return letter.toUpperCase();
        }
    }

    componentDidMount(){
        this.getCityData()

        //获取List组件的实例
        // 创建ref
        this.list = React.createRef()
    }

    //获取城市列表数据
    getCityData=async ()=>{
        const { status , data } =await getCityList()
        // console.log(data);
        if (status===200) {
            const {cityIndex,cityList} = this.formatCities(data)
            // console.log(cityList,cityIndex)
            //获得热门城市数据（如果解构status , data则需要起别名）
            const res = await getHotCity()
            if (res.status===200) {

                //将热门城市加入了列表
                cityList['hot'] = res.data;
                //将热门城市加入了列表key里
                cityIndex.unshift('hot');

                //加入当前定位城市数据
                const result = await getCurrCity()
                //将当前定位城市加入了列表
                cityList['curr'] = [result];
                //将当前定位城市加入了列表key里
                cityIndex.unshift('curr');

                // console.log(cityList,cityIndex,result)

                //响应式
                this.setState({
                    cityList,
                    cityIndex
                })
            }
        }
    }

    //处理数据
    formatCities=(data)=>{
        // 城市归类的数据
        let cityIndex=[];
        let cityList = {};
        data.forEach((item)=>{
            // 数组排重
            //截器城市拼音首字母
            let cfirst = item.short.slice(0,1);
            // console.log(cfirst);
            if (!cityList[cfirst]) {
                //如果没有这个城市拼音首字母
                cityList[cfirst] = [item]
            }else{
                cityList[cfirst].push(item)
            }
        })
        //取出所有拼音首字母放到数组里
        cityIndex = Object.keys(cityList).sort();
        return {
            cityIndex,
            cityList
        }
    }

    //选择切换城市
    switchCity=(city,e)=>{
        // console.log(city,e)
        //有数据的城市
        const hasData = ['北京', '上海', '广州', '深圳'];
        if (hasData.includes(city.label)) {
            //更新本地存储当前城市数据
            setLocalData(CURR_CITY,JSON.stringify(city))
            this.props.history.goBack()
        }else{
            //提示没有数据
            Toast.info('该城市暂无房源数据',2)
        }
    }

    // 渲染列表项
    rowRenderer=({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style // Style object to be applied to row (to position it)
    })=> {
        // console.log(index);
        const { cityIndex , cityList } =this.state;
        // console.log('key',cityIndex[index]);
        //获取归类索引值（key）
        const letter = cityIndex[index];
        //根据key获取归类的城市
        const item = cityList[letter]
        return (
            
            // {/* 渲染数据 */}
            <div key={key} style={style} className="city-item">
                {/* 城市首字母只有一个 */}
                <div className="title">{this.formatLetter(letter)}</div>
                {/* 城市可能是多个 */}
                {
                    item.map((it)=><div onClick={(e)=>this.switchCity(it,e)} key={it.value} className="name">{it.label}</div>)
                }
            </div>
        );
    }

    //计算行高
    exItemHeight=({ index })=>{
        const { cityIndex , cityList } =this.state;
        // console.log('key',cityIndex[index]);
        //获取归类索引值（key）
        const letter = cityIndex[index];
        //根据key获取归类的城市
        const item = cityList[letter];
        return 36 + 50*item.length;
    }


    // 右侧索引-格式化字母（处理热门城市和当前城市）
    formatLetter = (letter, first)=> {
        switch (letter) {
        case 'hot':
            return first ? '热' : '热门城市';
        case 'curr':
            return first ? '当' : '当前城市';
        default:
            return letter.toUpperCase();
        }
    } 

    // 渲染右侧索引
    renderCityIndex = () => {
        const { cityIndex , activeIndex } = this.state;
        return cityIndex.map((item, index) => {
            return (
                <li
                key={item}
                className="city-index-item"
                onClick={()=>{
                    // console.log(this.list)
                    this.list.current.scrollToRow(index);
                    this.setState({
                        activeIndex: index
                    })
                }}
                >
                <span className={activeIndex === index ? 'index-active' : ''}>
                    {this.formatLetter(item, true)}
                </span>
                </li>
            )
        })
    } 

    //每次row渲染就会执行
    // 滚动列表触发(每次重新渲染列表后都会触发)
    onRowsRendered=({startIndex})=>{
        // console.log(startIndex)
        //更新activeIndex完成滚动列表触发
        if (this.state.activeIndex !== startIndex) {
            this.setState({
                activeIndex:startIndex
            })
        }
    }

    render() {
        return (
            <div className="cityList">
                {/* 返回导航 */}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >城市选择</NavBar>

                
                {/* 城市列表组件 */}
                {/* 列表 */}
                <AutoSizer>
                {({ height, width }) => (
                    <List
                    // 绑定ref
                    ref={this.list}
                    scrollToAlignment='start'
                    onRowsRendered={this.onRowsRendered}
                    height={height}
                    rowCount={this.state.cityIndex.length}
                    rowHeight={this.exItemHeight}
                    rowRenderer={this.rowRenderer}
                    width={width}
                    />
                    )}
                </AutoSizer>
                {/* 右侧索引列表 */}
                <ul className="city-index">
                    {this.renderCityIndex()}
                </ul>  
            </div>
        )
    }
}

export default CityList;