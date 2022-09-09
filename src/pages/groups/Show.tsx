import { Link, useParams } from "react-router-dom";
import { currencyFormat, DataTable, SectionError, SectionLoader, StatusChip, TableDate } from '@nabcellent/sui-react';
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment';
import CardBgCorner from 'components/CardBgCorner';
import { useGetGroupQuery } from 'features/groups/groupsApi';
import SidoohAccount from '../../components/SidoohAccount';
import { logger } from 'utils/logger';

const Show = () => {
    const { id } = useParams();
    const { data: group, isLoading, isSuccess, isError, error } = useGetGroupQuery(Number(id));

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !group) return <SectionLoader/>;

    logger.log(group);

    return (
        <>
            <Card className={'mb-3'}>
                <CardBgCorner corner={2}/>
                <Card.Header>
                    <Row>
                        <Col><h5 className="mb-2">{group.name}</h5></Col>
                        <Col sm={'auto'} className={'d-none d-sm-block'}>
                            <h6 className={'text-600 text-uppercase'}>Group <FontAwesomeIcon icon={faUser}/></h6>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className={'border-top'}>
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faUser} className={'text-primary me-2'}/>
                        <div className="flex-1">
                            <p className={'mb-0'}>Group Was Created On:</p>
                            <p className={'fs--1 mb-0 text-600'}>{moment(group.created_at)
                                .format('MMM Do Y, @hh:mm A')}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <Card className={'mb-3'}>
                <CardBgCorner corner={2}/>
                <Card.Header className="d-flex align-items-center justify-content-between">
                    <h5>Details</h5>
                    <StatusChip status={group.status} soft={false} />
                </Card.Header>
                <Card.Body as={Row}>
                    <Col lg xxl={5}>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">ID</p></Col>
                            <Col>#{group.id}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Type</p></Col>
                            <Col>{group.type}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Duration</p></Col>
                            <Col>{group.duration ?? 'N/A'}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Frequency</p></Col>
                            <Col>{group.frequency ?? 'N/A'}</Col>
                        </Row>
                    </Col>
                    <Col lg xxl={5} className="">
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Balance</p></Col>
                            <Col>{currencyFormat(group.balance)}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Interest</p></Col>
                            <Col>{currencyFormat(group.interest)}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Target Amount</p></Col>
                            <Col>{currencyFormat(group.target_amount)}</Col>
                        </Row>
                        <Row>
                            <Col xs={5} sm={4} className="pe-0"><p className="fw-semi-bold mb-0">Frequency Amount</p></Col>
                            <Col>{currencyFormat(group.frequency_amount)}</Col>
                        </Row>
                    </Col>
                </Card.Body>
            </Card>

            <Card className={'mb-3'}>
                <Card.Body>
                    <DataTable title={'Accounts'} data={group.group_accounts} columns={[
                        {
                            accessorKey: 'user',
                            header: 'User',
                            cell: ({row}: any) => <SidoohAccount account={row.original.account}/>
                        },
                        {
                            accessorKey: 'balance',
                            header: 'Balance',
                            cell: ({row}: any) => currencyFormat(row.original.balance)
                        },
                        {
                            accessorKey: 'created_at',
                            header: 'Created',
                            cell: ({row}: any) => <TableDate date={row.original.created_at}/>
                        },
                        {
                            accessorKey: 'status',
                            header: 'Status',
                            cell: ({row}: any) => <StatusChip status={row.original.status}/>
                        },
                        {
                            id: 'actions',
                            header: '',
                            cell: ({ row }: any) => (
                                <Link to={`/group-accounts/${row.original.id}`}><FontAwesomeIcon icon={faEye}/></Link>
                            )
                        }
                    ]}/>
                </Card.Body>
            </Card>
        </>
    );
};

export default Show;
