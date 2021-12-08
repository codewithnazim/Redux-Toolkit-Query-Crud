import { useState, useEffect } from "react";
import { Input, Row, Col, Button, Card } from "antd";
import { useGetSudentsQuery, useUpdateStudentMutation } from '../../services/students'
const EditStudent = ({ history, match }) => {
  const [data, setData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [updateStudent] = useUpdateStudentMutation();
  //data:studentData we are changig the destruction name of data because we have data declared at many places
  const { data: studentData } = useGetSudentsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.find((el) => el.id == match.params.id)
    })
  })
  //here we are checking if there is a studentdata then set the form data to student data ,which is comming from querry
  useEffect(() => {
    if (studentData) {
      setData(studentData)
    }
  }, [studentData]) //we are setiing a dependec of addStudent bcause this is the main data
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    await updateStudent(data)
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
      <Card title="Edit a new student">
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
            />
          </Col>
          <Col span={24}>
            <Input
              size="large"
              placeholder="Enter Student E-mail address"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </Col>
          <Col span={24}>
            <Button htmlType="submit" type="primary">
              Update Student
            </Button>
          </Col>
        </Row>
      </Card>
    </form>
  );
};

export default EditStudent;
