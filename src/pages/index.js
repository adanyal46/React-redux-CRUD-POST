import {Button, Card, Col, Form, Input, InputNumber, Row, Skeleton, Space, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, getPost, setEdit, updatePost} from "../redux/features/postSlice";
import {Link} from "react-router-dom";
import {useEffect} from "react";

const Home = () => {
    let [form] = Form.useForm()
    const dispatch = useDispatch()
    const {post, loading, edit, body} = useSelector((state) => ({...state.app}))
    useEffect(() => {
        if (body) {
            form.setFieldValue('body', body)
        } else {
            form.resetFields()
        }
    }, [body, form]);
    const handleFetchUser = (values) => {
        const id = values.id
        dispatch(getPost({id}))
        dispatch(setEdit({edit: false, body: null}))
    }
    const handleDeletePost = (id) => {
        dispatch(deletePost({id}))
    }
    const handleUpdatePost = (id) => {
        const body = form.getFieldValue('body');
        const title = form.getFieldValue('title');
        console.log(id, title, body)
        dispatch(updatePost({id, title, body}))
        dispatch(setEdit({edit: false, body: null}))
    }

    return (
        <div className={'container'}>
            <Row justify={'center'} align={'middle'} gutter={[24, 20]}>
                <Col xs={24} md={10}>
                    <Card>
                        <Form layout={'vertical'} onFinish={handleFetchUser}>
                            <Form.Item name={'id'} label={'ID'} rules={[{required: 'true'}]}>
                                <InputNumber style={{width: '100%'}} size={'large'} placeholder={'Enter user id'}/>
                            </Form.Item>
                            <Space direction={'vertical'} style={{width: '100%'}}>
                                <Button type={'primary'} htmlType={'submit'} block={true}>Fetch User Post</Button>
                                <Link to={'/create'}>
                                    <Button type={'primary'} block={true}>Create User Post</Button>
                                </Link>
                            </Space>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} md={16}>
                    {loading ? <Skeleton/> : post?.length > 0 && post.map((item) => (<Card>
                        <Space direction={'vertical'} size={0} className={'w-100'}>
                            <Typography.Title level={4}>
                                {item.title}
                            </Typography.Title>
                            {edit ? <Form form={form}>
                                <Form.Item name={'title'} initialValue={item.title}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item name={'body'}>
                                    <Input.TextArea/>
                                </Form.Item>
                                <Space>
                                    <Button type={'dashed'}
                                            onClick={() => dispatch(setEdit({edit: false, body: null}))}>
                                        Cancel
                                    </Button>
                                    <Button type={'primary'} onClick={() => handleUpdatePost(item.id)}>
                                        Save
                                    </Button>
                                </Space>
                            </Form> : <Typography.Text type={'secondary'}>
                                {item.body}
                            </Typography.Text>}
                        </Space>
                        {!edit && <Space className={'w-100 justify-end'} style={{marginTop: '20px'}}>
                            <Button onClick={() => dispatch(setEdit({edit: true, body: item.body}))}
                                    type={'dashed'}>Edit</Button>
                            <Button onClick={() => handleDeletePost(item.id)} type={'dashed'}
                                    style={{background: '#f93737', color: 'white'}}>Delete</Button>
                        </Space>}
                    </Card>))}
                </Col>

            </Row>
        </div>)
}
export default Home