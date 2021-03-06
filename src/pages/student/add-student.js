import { useState } from "react";
import { Input, Row, Col, Button, Card } from "antd";
import { useAddStudentMutation } from '../../services/students'
const AddStudent = ({ history }) => {
  const [data, setData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  // console.log(useAddStudentMutation()) it will give a array in response,and give a function and object to mutate
  // we are using []to destruct bcause we are getting aray from the response
  const [addStudent, { isLoading, isSuccess }] = useAddStudentMutation();


  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    await addStudent(data);
    // after submit data
    setData({
      fullName: "",
      phone: "",
      email: "",
    });

    history.push("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card title="Create a new student">
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Input
              size="large"
              placeholder="Enter Student Full Name"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
            />
          </Col>
          <Col span={24}>
            <Input
              size="large"
              placeholder="Enter Student Phone Number"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Col>
          <Col span={24}>
            <Input
              size="large"
              placeholder="Enter Student E-mail address"
              name="email"
              value={data.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Col>
          <Col span={24}>
            <Button htmlType="submit" type="primary"
              disabled={isLoading}
            >
              Add Student
            </Button>
          </Col>
        </Row>
      </Card>
    </form>
  );
};

export default AddStudent;
