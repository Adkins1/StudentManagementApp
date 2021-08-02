import './App.css';
import { useState, useEffect } from 'react';
import { getAllStudents, deleteStudent } from './client';
import { 
  Layout,
  Menu, 
  Breadcrumb, 
  Table,
  Spin,
  Button,
  Tag,
  Badge,
  Popconfirm, 
  message
} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import StudentDrawerForm from './StudentDrawerForm';
import Avatar from 'antd/lib/avatar/avatar';
import { errorNotification } from './Notification';

function App() {
  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
      return <Avatar icon={<UserOutlined/>}/>;
    }
    const split = trim.split(" ");
    if(split.length === 1){
      return <Avatar>{name.charAt(0)}</Avatar>;
    }
    return <Avatar>{`${name.charAt(0)}${name.charAt(name.length-1)}`}</Avatar>;
  };

  const onDelete = student => {
    deleteStudent(student)
    .then(() => {
      fetchStudents();
      message.info('Deleted: ' + student.name);
    })
    .catch(err => {
      err.response.json().then(res => {
        errorNotification(
          "There was an issue",
          `${res.message} [statusCode:${res.status}] [${res.error}]`
        )
      });
    });
  }

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, student) => <TheAvatar name={student.name}/>
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, student) => (
        <>
          <Button onClick={() => console.log(JSON.parse(student.id))} type="primary">Edit</Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure to delete this Student?"
            onConfirm={() => onDelete(student)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Delete</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  const fetchStudents = () => {
    getAllStudents()
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setFetching(false);
      })
      .catch(err => {
        console.log(err.reponse)
        err.response.json().then(res => {
          errorNotification(
            "There was an issue",
            `${res.message} [statusCode:${res.status}] [${res.error}]`
          )
        })
      })
      .finally( ()=> setFetching(false));
    }

  useEffect(() => {
    fetchStudents();
  }, []);

  const renderStudents = () => {
    if(fetching){
      return <Spin indicator={antIcon} />;
    }
    if(students.length <= 0) {
      return <>
      <StudentDrawerForm 
        setShowDrawer={setShowDrawer}
        showDrawer={showDrawer}
        fetchStudents={fetchStudents}
      />
      <Table
            dataSource={students}
            columns={columns}
            bordered
            title = { () =><>
              <Button 
                type="primary" 
                shape="round" 
                icon={<PlusOutlined/>}
                onClick={()=>setShowDrawer(!showDrawer)}>
                  Add New Student
              </Button> 
              </>
            }
        />
    </>
    }
    return <>
    <StudentDrawerForm 
      setShowDrawer={setShowDrawer}
      showDrawer={showDrawer}
      fetchStudents={fetchStudents}
      />
    <Table
            dataSource={students}
            columns={columns}
            bordered
            title = { () =><>
              <Tag>Number of students</Tag>
              <Badge count={students.length} className="site-badge-count-4"/>
              <Button 
                type="primary" 
                shape="round" 
                icon={<PlusOutlined/>}
                onClick={()=>setShowDrawer(!showDrawer)}>
                  Add New Student
              </Button> 
              </>
            }
            pagination = {{ pageSize : 50 }}
            scroll = {{ y: 400 }}
            rowKey={(student) => student.id}
            />
    </>
  }

  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} 
      onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {renderStudents()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>CodeCool 2021</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
