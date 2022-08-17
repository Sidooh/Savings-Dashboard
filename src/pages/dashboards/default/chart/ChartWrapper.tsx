import { useState } from 'react';
import { ComponentLoader, SectionError } from '@nabcellent/sui-react';
import { useGetDashboardChartDataQuery } from 'features/savings/savingsApi';
import { Card, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from '@fortawesome/free-solid-svg-icons';
import Chart from './Chart';

const ChartWrapper = () => {
    const {data, isError, error, isLoading, isSuccess} = useGetDashboardChartDataQuery();

    const [chartSelect, setChartSelect] = useState<'personal' | 'group'>('personal');

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    console.log(data);

    return (
        <Card className="rounded-3 overflow-hidden h-100">
            <Card.Body className="d-flex flex-column justify-content-between"
                       style={{backgroundImage: 'linear-gradient(-45deg, #0F1B4C, #624900)'}}>
                <Row className="align-items-center g-0 mb-3 justify-content-end">
                    <Col xs="auto" className="d-none d-sm-flex align-items-center">
                        <button className="btn btn-sm btn-outline-light me-2 refresh-chart" type="button"
                                title="Update Chart">
                            <FontAwesomeIcon icon={faSync}/>
                        </button>
                        <Form.Select size="sm" value={chartSelect}
                                     onChange={e => setChartSelect(e.target.value as 'personal' | 'group')}>
                            <option value="personal">Personal Transactions</option>
                            <option value="group">Group Transactions</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Chart data={data} labels={data.yesterday[chartSelect].labels} status={chartSelect}
                       style={{height: '200px'}}/>
            </Card.Body>
        </Card>
    );
};

export default ChartWrapper;
