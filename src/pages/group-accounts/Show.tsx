import { Link, useParams } from "react-router-dom";
import { PhoneChip, SectionError, SectionLoader, StatusChip } from '@nabcellent/sui-react';
import { Card, Col, Row } from "react-bootstrap";
import { CONFIG } from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment';
import CardBgCorner from 'components/CardBgCorner';
import SavingsTransactionTable from "components/tables/SavingsTransactionTable";
import { useGetGroupAccountQuery } from 'features/group-accounts/groupAccountApi';
import { logger } from 'utils/logger';

const Show = () => {
    const { id } = useParams();
    const { data: gA, isLoading, isSuccess, isError, error } = useGetGroupAccountQuery(Number(id));

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !gA) return <SectionLoader />;

    logger.log(gA);

    return (
        <>
            <Card className={'mb-3'}>
                <CardBgCorner corner={4} />
                <Card.Header>
                    <Row>
                        <Col>
                            <h5 className="mb-2">
                                {gA.account?.user?.name}
                                (<a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${gA.account?.id}`}
                                    target={'_blank'}><PhoneChip phone={gA.account?.phone} />
                                </a>)
                            </h5>
                        </Col>
                        <Col sm={'auto'} className={'d-none d-sm-block'}>
                            <h6 className={'text-600 text-uppercase'}>Group Account <FontAwesomeIcon icon={faUser} /></h6>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className={'border-top'}>
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faUser} className={'text-primary me-2'} />
                        <div className="flex-1">
                            <p className={'mb-0'}>Account Was Created On:</p>
                            <p className={'fs--1 mb-0 text-600'}>{moment(gA.created_at).format('MMM Do Y, @hh:mm A')}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <Card className={'mb-3'}>
                <CardBgCorner corner={4} />
                <Card.Header className="pb-0"><h5>Details</h5></Card.Header>
                <Card.Body as={Row} className={'position-relative'}>
                    <Col lg xxl={5}>
                        <h6 className="fw-semi-bold ls mb-3 text-uppercase">Group Account Information</h6>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">ID</p></Col>
                            <Col>#{gA.id}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Balance</p></Col>
                            <Col>{gA.balance}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Status</p></Col>
                            <Col><StatusChip status={gA.status} soft={false} /></Col>
                        </Row>
                    </Col>
                    <Col lg xxl={5} className="mt-4 mt-lg-0">
                        <h6 className="fw-semi-bold ls mb-3 text-uppercase">Group Information</h6>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Name</p></Col>
                            <Col>
                                <Link to={`/groups/${gA.group_id}`}>{gA.group.name}</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Balance</p></Col>
                            <Col>{gA.group.balance}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Status</p></Col>
                            <Col><StatusChip status={gA.group.status} soft={false} /></Col>
                        </Row>
                    </Col>
                </Card.Body>
            </Card>

            <SavingsTransactionTable title="Transactions" transactions={gA.transactions} entity="personal-accounts" showCustomer={false} />
        </>
    );
};

export default Show;
