import { ComponentLoader } from 'components/Loader';
import { Suspense } from 'react';
import Summaries from './Summaries';
import RecentPersonalTransactions from './RecentPersonalTransactions';
import { Col, Row } from 'react-bootstrap';
import RecentPersonalCollectiveInvestments from './RecentPersonalCollectiveInvestments';
import ChartWrapper from './chart/ChartWrapper';

const Dashboard = () => {
    return (
        <>
            <Row className="g-3 mb-3">
                <Col>
                    <Suspense fallback={<ComponentLoader/>}><ChartWrapper/></Suspense>
                </Col>
            </Row>

            <Row className="g-3 mb-3">
                <Col>
                    <Suspense fallback={<ComponentLoader/>}><Summaries/></Suspense>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Suspense fallback={<ComponentLoader/>}><RecentPersonalTransactions/></Suspense>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Suspense fallback={<ComponentLoader/>}><RecentPersonalCollectiveInvestments/></Suspense>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
