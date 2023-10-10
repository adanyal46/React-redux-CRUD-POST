import {Button, Card, Col, Form, Input, Row, Skeleton, Space, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {createPost, deletePost} from "../redux/features/postSlice";
import {Link} from "react-router-dom";

const CreatePost = () => {
    let [form] = Form.useForm();
    const {loading,post} = useSelector((state) => ({...state.app}))
    const dispatch = useDispatch()
    const handleCreatePost = (values) => {
        dispatch(createPost({values}))
        form.resetFields()
    }
    const handleDeletePost = (id) => {
        dispatch(deletePost({id}))
    }
    return (
        <Row justify={'center'} align={'middle'} gutter={[24, 20]}>
            <Col xs={24} md={10}>
                <Card>
                    <Link to={'/'}>
                        <Button type={'dashed'} style={{marginBottom: '10px'}}>
                            Go Back
                        </Button>
                    </Link>
                    <Form form={form} layout={'vertical'} onFinish={handleCreatePost}>
                        <Form.Item name={'title'} label={'Title'} rules={[{required: 'true'}]}>
                            <Input style={{width: '100%'}} size={'large'} placeholder={'Enter title'}/>
                        </Form.Item>
                        <Form.Item name={'body'} label={'Body'} rules={[{required: 'true'}]}>
                            <Input.TextArea style={{width: '100%'}} size={'large'} placeholder={'Enter body'}/>
                        </Form.Item>
                        <Button type={'primary'} block={true} htmlType={'submit'}>Create Post</Button>
                    </Form>
                </Card>
            </Col>
            <Col xs={24} md={16}>
                {loading ? <Skeleton/> : post?.length > 0 && post.map((item) => (
                    <Card>
                        <Space direction={'vertical'} size={0} className={'w-100'}>
                            <Typography.Title level={4}>
                                {item.title}
                            </Typography.Title>
                            <Typography.Text type={'secondary'}>
                                {item.body}
                            </Typography.Text>
                        </Space>
                        <Space className={'w-100 justify-end'} style={{marginTop: '20px'}}>
                            <Button onClick={() => handleDeletePost(item.id)} type={'dashed'}
                                    style={{background: '#f93737', color: 'white'}}>Delete</Button>
                        </Space>
                    </Card>
                ))}
            </Col>
        </Row>

    )
}
export default CreatePost