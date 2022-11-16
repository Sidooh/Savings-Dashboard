import { currencyFormat, StatusChip } from '@nabcellent/sui-react';
import CardBgCorner from 'components/CardBgCorner';
import moment from 'moment';
import { Card, Col, Row } from 'react-bootstrap';
import { PersonalAccountTransaction } from '../utils/types';
import { CONFIG } from '../config';
import { logger } from 'utils/logger';

type TransactionProps = {
    title: 'Group Account' | 'Personal Account',
    transaction: PersonalAccountTransaction
}

const Transaction = ({ title, transaction }: TransactionProps) => {
    logger.log(transaction);

    return (
        <>
            <Card className={'mb-3'}>
                <CardBgCorner corner={2}/>
                <Card.Body className="position-relative">
                    <Row>
                        <Col>
                            <h5>{title} Transaction Details: #{transaction.id}</h5>
                            <p className="fs--1">{moment(transaction.created_at).format('MMM D, Y, hh:mm A')}</p>
                            <StatusChip status={transaction.status}/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="mb-3">
                <Card.Body>
                    <Row>
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <h5 className="mb-3 fs-0">Account</h5>
                            <h6 className="mb-2">
                                <a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/users/${transaction.account?.user_id}`}
                                   target={'_blank'}>
                                    {transaction.account?.user?.name}
                                </a>
                            </h6>
                            <p className="mb-0 fs--1">
                                <a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${transaction.account?.id}`}
                                   target={'_blank'}>
                                    {transaction.account?.phone}
                                </a>
                            </p>
                        </Col>
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <h5 className="mb-3 fs-0">Details</h5>
                            <h6 className="mb-2">{transaction.description}</h6>
                            <p className="mb-0 fs--1"><strong>Type: </strong>{transaction.type}</p>
                            <div className="fs--1"><strong>Amount: </strong>({currencyFormat(transaction.amount)})</div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/*<TransactionPayment payment={transaction}/>*/}
        </>
    );
};

export default Transaction;
