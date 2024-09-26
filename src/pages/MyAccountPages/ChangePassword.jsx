import { Form, Input } from 'antd';
import React from 'react'
import Button from '../../components/ui/Button';
import { useChangePasswordMutation } from '../../redux/api/authApis';
import { toast } from 'sonner';

const ChangePassword = () => {
  const [form] = Form.useForm()
  const [Change] = useChangePasswordMutation()
  const onFinish = (values) => {
    Change(values).unwrap().then((payload) => {
      toast.success(payload?.message || "Password changed successfully")
    })
      .catch((error) => {
        toast.error(error?.data?.message || "Something went wrong")
      })
  }
  return (
    <div>
      <h1 className='text-yellow font-medium'>Change Password</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        <div className=' gap-5 mt-5'>
          <div >
            <Form.Item
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
              label={<p className="text-[16px]  font-normal">Current Password</p>}
            >
              <Input
                style={{
                  width: "100%",
                  height: 40,
                  border: "",
                  borderRadius: "5px",
                  color: "#919191",
                  outline: "none"
                }}
                className='text-[16px] leading-5 '
                placeholder="Current password"
                type='password'
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your new password",
                },
              ]}
              label={<p className=" text-[16px] font-normal">New Password</p>}
            >
              <Input
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: "5px",
                  color: "#919191",
                  outline: "none"
                }}
                className='text-[16px] leading-5'
                placeholder={`New password`}
                type='password'
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password",
                },
              ]}
              label={<p className=" text-[16px] font-normal">Confirm Password</p>}
            >
              <Input
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: "5px",
                  color: "#919191",
                  outline: "none"
                }}
                className='text-[16px] leading-5'
                placeholder={`Confirm password`}
                type='password'
              />
            </Form.Item>
          </div>


        </div>

        <Form.Item
          style={{
            marginBottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className='px-5 '
          >
            Save Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChangePassword