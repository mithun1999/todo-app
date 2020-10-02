import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';

import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user);

  
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    {
      user.userData && user.userData.isAuth && (
        <Menu.Item key="dashboard">
        <a href="/todolist">Manage Tasks</a>
        </Menu.Item>
      ) 
    }

{
      user.userData && user.userData.isAuth && (
        <Menu.Item key="add">
        <a href="/addtask">Add Task</a>
        </Menu.Item>
      ) 
    }

  </Menu>
  )
}

export default withRouter(LeftMenu)