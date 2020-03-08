import React from 'react';
import { Button , Checkbox } from 'antd-mobile'

const CheckboxItem = Checkbox.CheckboxItem;

function App() {
  return (
    <div className="app">
      <Button type="primary">ant按钮</Button>
      <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
          Undergraduate
      </CheckboxItem>
    </div>
  );
}

export default App;
