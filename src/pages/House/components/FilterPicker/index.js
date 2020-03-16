import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {

  state={
    //当前picker选中值
    value: this.props.value
  }

  //修改选中值
  setValue=(val)=>{
    // console.log(val);
    this.setState({
      value: val
    })
  }

  render() {
    const { onOk , onCancle , data , col } =this.props
    // console.log(onOk,onCancle)
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} value={this.state.value} onChange={this.setValue} cols={col} />

        {/* 底部按钮 */}
        <FilterFooter onOk={()=>onOk(this.state.value)} onCancle={onCancle} />
      </>
    )
  }
}
