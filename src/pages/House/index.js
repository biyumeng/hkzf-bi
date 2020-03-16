// 列表找房首页

import React from 'react'

import { Flex } from 'antd-mobile'
import { List , AutoSizer } from 'react-virtualized'

import Filter from './components/Filter'
// 导入样式（css module）
import styles from './index.module.css'

import { getCurrCity } from '../../utils'
import { getHouseList } from '../../utils/api/house'
import HouseItem from '../../components/HouseItem'
import { BASE_URL } from '../../utils/axios'


export default class HouseList extends React.Component {

  state = {
    // 房屋列表数据
    list:[]
  } 

  componentDidMount(){
    this.getCurrCityId()
  }

  // 获取当前城市id
  getCurrCityId = async ()=>{
    const {value} = await getCurrCity();
    //将id存到this中
    this.cityId=value

    //默认调用一次列表数据
    this.getHouseList()
  }

  //获取房源列表数据
  getHouseList = async () =>{
    const {status , data:{list}} = await getHouseList(this.cityId , this.filters)
    // console.log('222',res)
    if (status===200) {
      this.setState({
        list
      })
    }
  }

  //子传父拿到数据
  onFilter=(filters)=>{
    console.log('111',filters);
    //存储筛选条件数据
    this.filters = filters;
    //获取列表房源数据=》刷新列表
    this.getHouseList()
  }

  // 渲染列表项方法
  renderHouseItem = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {

    const {list} = this.state;
    let curItem = list[index];
    //处理图片地址
    curItem.src = BASE_URL + curItem.houseImg

    return (
      <HouseItem {...curItem} key={key} style={style} />
    );
  }

  //渲染房源列表组件
  renderHouseList=()=>{
    const {list} = this.state;
    return(
      <AutoSizer>
              {({ height, width }) => (
                <List
                  className={styles.houseList}
                  height={height}
                  rowCount={list.length}
                  rowHeight={130}
                  rowRenderer={this.renderHouseItem}
                  width={width}
              />
            )}
        </AutoSizer>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter} />

        {/* 房源列表 */}
        {
          this.renderHouseList()
        }
            
      </div>
    )
  }
}
