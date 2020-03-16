import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {

  state = {
    //定义选中条件的数据状态
    selected: this.props.value
  }

  //处理选择的条件数据
  handlerSel=(cur)=>{
    const {selected} = this.state;
    //拷贝一份新的
    const newSel = [...selected];
    //根据当前选中的做判断
    let isSel = newSel.indexOf(cur)
    if (isSel>=0) {
      //已经选中就取消
      newSel.splice(isSel,1)
    }else {
      //没选择就添加
      newSel.push(cur)
    }
    this.setState({
      selected:newSel
    })
  }

  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    const {selected} = this.state;
    return (
       data.map((item)=>{
        return <span 
        onClick={()=>this.handlerSel(item.value)}
        key={item.value} className={[styles.tag, selected.includes(item.value) ? styles.tagActive : ''].join(' ')}>{item.label}</span>
      })
    )
  }

  render() {
    const { data:{roomType,oriented,floor,characteristic}, value , onOk , onCancel } = this.props
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter onOk={()=>onOk(this.state.selected)} onCancle={onCancel} className={styles.footer} />
      </div>
    )
  }
}
