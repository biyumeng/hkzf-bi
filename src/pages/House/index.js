// 列表找房首页

import React from 'react'

import { Flex , Toast} from 'antd-mobile'
import { List , AutoSizer , InfiniteLoader } from 'react-virtualized'
 
import Filter from './components/Filter'
// 导入样式（css module）
import styles from './index.module.css'

import { getCurrCity } from '../../utils'
import { getHouseList } from '../../utils/api/house'
import HouseItem from '../../components/HouseItem'
import { BASE_URL } from '../../utils/axios'

import NoHouse from '../../components/NoHouse'


export default class HouseList extends React.Component {

  state = {
    // 房屋列表数据
    list:[],
    //列表总条数
    count:0
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
    const {status , data:{list,count}} = await getHouseList(this.cityId , this.filters)
    // console.log('222',res)
    if (status===200) {
      if (count>0) {
        Toast.success(`获取到${count}条房源数据`,2)
      }
      this.setState({
        list,
        count
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
    //数据正在获取,显示骨架屏
    if (!curItem) {
      return (
        <div style={style} key={key}>
          <p className={styles.loading}></p>
        </div>
      )
    }
    //处理图片地址
    curItem.src = BASE_URL + curItem.houseImg

    return (
      <HouseItem onClick={() =>this.props.history.push(`/detail/${curItem.houseCode}`)} {...curItem} key={key} style={style} />
    );
  }

  //渲染房源列表组件
  renderHouseList=()=>{
    const {list,count} = this.state;
    return(
      count?
      <InfiniteLoader
      isRowLoaded={this.isRowLoaded}
      loadMoreRows={this.loadMoreRows}
      rowCount={count}
      >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
        {({ height, width }) => (
          <List
            className={styles.houseList}
            height={height}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowCount={count}
            rowHeight={130}
            rowRenderer={this.renderHouseItem}
            width={width}
        />
      )}
      </AutoSizer>
      )}
      </InfiniteLoader>:<NoHouse>无房源数据</NoHouse>

    )
  }

  //下拉加载更多
  //行是否加载完成
  isRowLoaded = ({ index })=> {
    return !!this.state.list[index];
  }
  //下拉加载更多数据
  loadMoreRows = ({ startIndex, stopIndex })=> {
    return getHouseList(this.cityId , this.filters,startIndex, stopIndex)
      .then(response => {
        // Store response data in list...
        // console.log(startIndex, stopIndex,response)
        const {status,data:{list,count}} = response;
        if (status===200) {
          this.setState({
            list:[...this.state.list, ...list],
            count
          })
        }
      })
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
