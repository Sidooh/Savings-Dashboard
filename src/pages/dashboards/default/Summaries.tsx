import { Badge, ComponentLoader, SectionError } from '@nabcellent/sui-react';
import { Card, Col, Row } from "react-bootstrap";
import { useGetDashboardSummariesQuery } from "features/savings/savingsApi";
import CardBgCorner from 'components/CardBgCorner';
import CountUp from 'react-countup';

const Board = ({
    title,
    today,
    total,
    bgCorner = 1,
    currency = false
}: { title: string, today: number, total: number, bgCorner?: 1 | 2 | 3 | 4 | 5, currency?: boolean }) => (
    <Col lg={3}>
        <Card>
            <CardBgCorner corner={bgCorner}/>
            <Card.Body as={Row}>
                <Col className="pe-0 d-md-flex d-lg-block flex-between-center">
                    <h6 className="mb-md-0 mb-lg-3">{title}</h6>
                    <h5 className="fw-normal text-700 m-0">
                        <CountUp end={total} separator="," prefix={currency ? 'KES ' : ''}/>
                    </h5>
                </Col>
                <Col lg={'auto'} className={'ps-0 d-flex align-items-start justify-content-end'}>
                    <Badge bg={currency ? "success" : 'primary'} pill>
                        <CountUp end={today} separator="," prefix={currency ? 'KES ' : ''}/>
                    </Badge>
                </Col>
            </Card.Body>
        </Card>
    </Col>
);

const Summaries = () => {
    const {data: stats, isError, error, isLoading, isSuccess} = useGetDashboardSummariesQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !stats) return <ComponentLoader/>;

    console.log(stats);

    return (
        <>
            <Row className="g-3">
                <Board title={'Personal Accounts'} today={stats.count_personal_accounts_today}
                       total={stats.count_personal_accounts}/>
                <Board title={'Group Accounts'} today={stats.count_group_accounts_today}
                       total={stats.count_group_accounts} bgCorner={2}/>
                <Board title={'Personal Accounts'} today={stats.amount_personal_accounts_today}
                       total={stats.amount_personal_accounts} bgCorner={3} currency/>
                <Board title={'Group Accounts'} today={stats.amount_group_accounts_today}
                       total={stats.amount_group_accounts} currency/>
            </Row>
        </>
    );
};

export default Summaries;
