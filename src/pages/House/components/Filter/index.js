// 条件过滤器组件

import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

import { getPickerData } from '../../../../utils/api/house'
import { getCurrCity } from '../../../../utils'


// 标题高亮状态(默认值)
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
  }

  // 选中数据维护(测试)
const selectedValues = {
  area: ['area', 'null'],
  // area: ['area', 'AREA|69cc5f6d-4f29-a77c', 'AREA|73aa1890-64c7-51d9'],
  mode: ['null'],
  // mode: ['true'],
  price: ['null'],
  more: [],
  // price: ['PRICE|1000'],
}

export default class Filter extends Component {
  // 设置状态
  state = {
    titleSelectedStatus: { ...titleSelectedStatus },
    //当前打开的type（过滤器）
    openType:''
  }

  componentDidMount(){
    this.getFilterData()

    //实例上存储选中的条件数据
    this.selectedValues = {...selectedValues}
  }

  //获取过滤条件数据
  getFilterData=async()=>{
    const curCity = await getCurrCity();
    const {status,data} =await getPickerData(curCity.value);
    //存储到this（轻量的state）
    if (status === 200) {
      this.filterData = data;
      // console.log(data)
    }
  }

  //处理已经有选择条件的筛选器的高亮
  handlerSel = ()=>{
    const newTitleSel = {};
    Object.keys(this.selectedValues).forEach((item)=>{
      //当前filter的数据
      let curFilterData = this.selectedValues[item]
      if (item === 'area' && (curFilterData[1]!=='null') || curFilterData[0]==='subway' ) {
        newTitleSel.area = true
      }else if (item === 'mode' && curFilterData[0]!=='null') {
        newTitleSel.mode = true
      }else if (item === 'price' && curFilterData[0]!=='null') {
        newTitleSel.price = true
      }else if (item === 'more' && curFilterData.length>0 ) {
        newTitleSel.more = true
      }else{
        newTitleSel[item] = false
      }
    })
    return newTitleSel
  }

  //过滤器title(标题栏)点击时触发（父组件）
  onTitleClick=(type)=>{
    // console.log('当前点击',type)
    this.setState({
      titleSelectedStatus : { ...titleSelectedStatus , [type]:true },
      openType:type
    })
  }

  //处理筛选器数据
  handlerFilters=()=>{
    //1.获取筛选器数据
    const {area,mode,price,more} = this.selectedValues;
    // console.log(area,mode,price,more)
    //2.根据后台需要数据格式进行处理
    const filtes = {};
    let areaKey=area[0];
    let areaVal;
    if (area.length === 2) {
      areaVal = area[1]
    }else{
      //如果区域选项第三位不是null
      if (area[2]==='null') {
        areaVal =area[1]
      }else{
        areaVal =area[2]
      }
    }
    filtes[areaKey] = areaVal;
    //mode(方式)
    filtes.rentType = mode[0];
    //price(租金)
    filtes.price = price[0];
    //more(筛选)
    filtes.more = more.join(',');
    // console.log('后台',filtes)
    return filtes;
  }

  //是否显示前三个title过滤器
  isShowPicker=()=>{
    //获取当前打开的过滤器
    const { openType } = this.state;
    return openType === 'area' || openType === 'mode' || openType === 'price'
  }

  //确定时关闭
  onOk=(filter)=>{
    //获取当前打开的过滤器
    const { openType } = this.state;
    // console.log('sss',filter)
    //确定的时候根据openType存储选中的值
    this.selectedValues[openType] = filter;
    //处理选中后的高亮显示
    let newSelStatus = this.handlerSel();

    this.setState({
      openType:'',
      //根据是否选中设置高亮的title
      titleSelectedStatus: newSelStatus
    },()=>{
        //把筛选器添加交给父组件
        this.props.onFilter(this.handlerFilters())
      }
    )
  }

  //取消时关闭
  onCancle=()=>{
    this.setState({
      openType:'',
      //根据是否选中设置高亮的title
      titleSelectedStatus: this.handlerSel()
    })
  }

  // 处理pick组件数据
  renderFilterPicker=()=>{
    if (this.isShowPicker()) {
      //处理拿到的数据
      const {openType} = this.state;

      let data = [] , col = 1;
      // data = this.filterData[openType]
      switch (openType) {
        case 'area':
          data = [this.filterData.area, this.filterData.subway]
          col = 3
          break
        case 'mode':
          data = this.filterData.rentType
          break
        case 'price':
          data = this.filterData.price
          break
        default:
          break
      } 

      //获取picker选中的值
      let sel = this.selectedValues[openType]

      return <FilterPicker key={openType} data={data} col={col} value={sel} onOk={this.onOk} onCancle={this.onCancle} />
    }
    return null 
  }

  //filterMore(筛选)筛选器
  renderFilterMore = () => {
    const {
      openType
    } = this.state;
    if (openType === 'more') {
      console.log(this.filterData);
      // 传递筛选器数据
      const { roomType, oriented, floor, characteristic } = this.filterData;
      const data = { roomType, oriented, floor, characteristic }
      return <FilterMore
          data={data}
          value={this.selectedValues[openType]}
          onOk={this.onOk}
          onCancel={this.onCancle}
        />
    }
      return null
  }


  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {
          this.isShowPicker() ? <div onClick={this.onCancle} className={styles.mask} /> : null
        }

        <div className={styles.content}>
          {/* 标题栏 （子组件）*/}
          <FilterTitle onTitleClick={this.onTitleClick} titleSelectedStatus={this.state.titleSelectedStatus} />

          {/* 前三个菜单对应的内容： */}
          {
            this.renderFilterPicker()
          }

          {/* 最后一个菜单对应的内容： */}
          {
            this.renderFilterMore()
          }
        </div>
      </div>
    )
  }
}
