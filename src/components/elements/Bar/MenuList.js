import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { 
    HomeOutlined,
    AppstoreOutlined,
    AreaChartOutlined,
    PayCircleOutlined,
    BarsOutlined
} from '@ant-design/icons'


const MenuList = ({ darkTheme }) => {
  return (
    <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>
        <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="registrar" icon={<AppstoreOutlined />}>
            <Link to="/formularioRQS">Registrar</Link>
        </Menu.Item>
        <Menu.SubMenu
            key='feedback'
            icon={<BarsOutlined />}
            title="RQS"
        >
            <Menu.Item key='feedback-1'><Link to="/Reclamos">Reclamos</Link></Menu.Item>
            <Menu.Item key='feedback-2'><Link to="/Solicitudes">Solicitudes</Link></Menu.Item>
            <Menu.Item key='feedback-3'><Link to="/Quejas">Quejas</Link></Menu.Item>
            
        </Menu.SubMenu>

    </Menu>
  )
}

export default MenuList