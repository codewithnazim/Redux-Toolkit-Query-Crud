import { Row, Col, Card, Typography } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useGetSudentsQuery, useDeleteStudentMutation } from '../../services/students'
import { useHistory } from "react-router-dom";
const { Title, Paragraph } = Typography;
const Students = ({ match }) => {
  let history = useHistory();
  const [deleteStudent] = useDeleteStudentMutation();
  const { data, isFetching } = useGetSudentsQuery(match.params.id);
  return (
    <>
      {
        isFetching ? (<p>Loading.....</p >) : (
          <Row gutter={[20, 20]}>
            {data.map((student) => (
              <Col span={6} key={student.id}>
                <Card
                  hoverable={true}
                  bordered={false}
                  cover={<img alt="example" src={`https://i.pravatar.cc/1920?img=${student.id}`} />}
                  actions={[
                    <EyeOutlined
                      key="view"
                      onClick={() => history.push(`/students/${student.id}`)}
                    />,
                    <EditOutlined
                      key="edit"
                      onClick={() => history.push(`/students/edit/${student.id}`)}
                    />,
                    <DeleteOutlined
                      key="setting"
                      onClick={() => deleteStudent(student.id)}
                    />,
                  ]}
                >
                  <div className="student-info">
                    <Title level={5}>{student.fullName}</Title>
                    <Paragraph>{student.email}</Paragraph>
                    <Paragraph>{student.phone}</Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )
      }
    </>
  );
};

export default Students;
