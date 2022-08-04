import { ComponentLoader } from 'components/Loader';
import { lazy, Suspense } from 'react';
import { Col, Row } from 'react-bootstrap';

const ChartWrapper = lazy(() => import('./chart/ChartWrapper'));
const Summaries = lazy(() => import('./Summaries'));
const RecentPersonalTransactions = lazy(() => import('./RecentPersonalTransactions'));
const RecentPersonalCollectiveInvestments = lazy(() => import('./RecentPersonalCollectiveInvestments'));

const Dashboard = () => {
    return (
        <>
            <Suspense fallback={<ComponentLoader/>}>
                <Row className="g-3 mb-3"><Col><ChartWrapper/></Col></Row>
            </Suspense>

            <Suspense fallback={<ComponentLoader/>}>
                <Row className="g-3 mb-3"><Col><Summaries/></Col></Row>
            </Suspense>

            <Suspense fallback={<ComponentLoader/>}>
                <Row><Col><RecentPersonalTransactions/></Col></Row>
            </Suspense>

            <Suspense fallback={<ComponentLoader/>}>
                <Row><Col><RecentPersonalCollectiveInvestments/></Col></Row>
            </Suspense>
        </>
    );
};

export default Dashboard;
