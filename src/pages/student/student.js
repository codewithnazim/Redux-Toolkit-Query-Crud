import React from "react";
import { Row, Col, Card, Image, Descriptions } from "antd";
import { useGetSudentByIdQuery, useGetSudentsQuery } from '../../services/students'
const Student = ({ match }) => {
  // const { data, isFetching } = useGetSudentByIdQuery(match.params.id);
  const { data } = useGetSudentsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.find((el) => el.id == match.params.id)
    })
  })
  // here we are fetchind data from alll query
  // we are taking the data and macthing it with id
  //here we have used data? ,it is optional chaining and it used bcause initialy data is undefined
  return (
    <div>
      {
        data == undefined ? (<p>Loading....</p>) : (
          <Card title="View Student Detials">
            <Row gutter={[0, 20]}>
              <Col span={8}>
                <Image width={200} src="https://i.pravatar.cc/300" />
              </Col>
              <Col span={16}>
                <Descriptions title="Subroto Biswas " layout="vertical">
                  <Descriptions.Item label="Full Name">
                    {data.fullName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone Number">
                    {data.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="E-mail Address">
                    {data.emai}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        )
      }
      {/* {
        isFetching ? (<p>Loading....</p>) : (
          <Card title="View Student Detials">
            <Row gutter={[0, 20]}>
              <Col span={8}>
                <Image width={200} src="https://i.pravatar.cc/300" />
              </Col>
              <Col span={16}>
                <Descriptions title="Subroto Biswas " layout="vertical">
                  <Descriptions.Item label="Full Name">
                    {data.fullName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone Number">
                    {data.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="E-mail Address">
                    {data.emai}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        )
      } */}

    </div>
  );
};

export default Student;
