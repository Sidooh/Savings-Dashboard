import { useParams } from "react-router-dom";
import { useGetPersonalAccountQuery } from '../../features/personal-accounts/personalAccountApi';
import { currencyFormat, PhoneChip, SectionError, SectionLoader, StatusChip } from '@nabcellent/sui-react';
import { Card, Col, Row } from "react-bootstrap";
import { CONFIG } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment';
import CardBgCorner from '../../components/CardBgCorner';
import SavingsTransactionTable from "components/tables/SavingsTransactionTable";
import { logger } from 'utils/logger';

const Show = () => {
    const { id } = useParams();
    const { data: pA, isLoading, isSuccess, isError, error } = useGetPersonalAccountQuery(Number(id));

    if (isError) return <SectionError error={error} />;
    if (isLoading || !isSuccess || !pA) return <SectionLoader />;

    logger.log(pA);

    return (
        <>
            <Card className={'mb-3'}>
                <CardBgCorner corner={3} />
                <Card.Header>
                    <Row>
                        <Col>
                            <h5 className="mb-2">
                                {pA.account?.user?.name}
                                (<a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${pA.account?.id}`}
                                    target={'_blank'}><PhoneChip phone={pA.account?.phone} />
                                </a>)
                            </h5>
                        </Col>
                        <Col sm={'auto'} className={'d-none d-sm-block'}>
                            <h6 className={'text-600 text-uppercase'}>Customer <FontAwesomeIcon icon={faUser} /></h6>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className={'border-top'}>
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faUser} className={'text-primary me-2'} />
                        <div className="flex-1">
                            <p className={'mb-0'}>Account Was Created On:</p>
                            <p className={'fs--1 mb-0 text-600'}>{moment(pA.created_at).format('MMM Do Y, @hh:mm A')}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <Card className={'mb-3'}>
                <CardBgCorner corner={3} />
                <Card.Header className="d-flex align-items-center justify-content-between">
                    <h5>Details</h5>
                    <StatusChip status={pA.status} soft={false} />
                </Card.Header>
                <Card.Body as={Row}>
                    <Col lg xxl={5}>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">ID</p></Col>
                            <Col>#{pA.id}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Type</p></Col>
                            <Col>{pA.type}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Description</p></Col>
                            <Col>{pA.description ?? 'N/A'}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Duration</p></Col>
                            <Col>{pA.duration ?? 'N/A'}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Frequency</p></Col>
                            <Col>{pA.frequency ?? 'N/A'}</Col>
                        </Row>
                    </Col>
                    <Col lg xxl={5} className="">
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Balance</p></Col>
                            <Col>{currencyFormat(pA.balance)}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Interest</p></Col>
                            <Col>{currencyFormat(pA.interest)}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Target Amount</p></Col>
                            <Col>{currencyFormat(pA.target_amount)}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Frequency Amount</p></Col>
                            <Col>{currencyFormat(pA.frequency_amount)}</Col>
                        </Row>
                    </Col>
                </Card.Body>
            </Card>

            <SavingsTransactionTable title="Transactions" transactions={pA.transactions} entity="personal-accounts" showCustomer={false} />
        </>
    );
};

export default Show;
