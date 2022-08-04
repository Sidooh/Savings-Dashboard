import { SectionError } from 'components/Error';
import { ComponentLoader } from 'components/Loader';
import { Card, Col, Row } from "react-bootstrap";
import { useGetDashboardSummariesQuery } from "features/savings/savingsApi";
import CardBgCorner from 'components/CardBgCorner';
import CountUp from 'react-countup';
import SoftBadge from 'components/SoftBadge';

const Board = ({
    title,
    today,
    total,
    bgCorner = 1,
    currency = false
}: { title: string, today: number, total: number, bgCorner?: 1 | 2 | 3 | 4 | 5, currency?: boolean }) => (
    <Col lg={3}>
        <Card style={{'height': '150px'}}>
            <CardBgCorner corner={bgCorner}/>
            <Card.Body>
                <Row className="h-100">
                    <Col className="d-flex flex-column align-items-start justify-content-between">
                        <h6 className="mb-md-0 mb-lg-2">{title}</h6>
                        <div>
                            <h4 className="fw-normal text-700 m-0">
                                <CountUp end={total} separator="," prefix={currency ? 'KES ' : ''}/>
                            </h4>
                            <SoftBadge bg="primary" className={`fw-bold fs-9 mt-2 mb-3`} pill soft>
                                <CountUp end={today} separator="," prefix={currency ? 'KES ' : ''}/>
                            </SoftBadge>
                        </div>
                    </Col>
                </Row>
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
