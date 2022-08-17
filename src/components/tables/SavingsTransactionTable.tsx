import { PersonalAccountTransaction } from 'utils/types';
import { Card } from 'react-bootstrap';
import SidoohAccount from 'components/SidoohAccount';
import { currencyFormat, DataTable, StatusChip, TableDate } from '@nabcellent/sui-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

const Transactions = ({title, transactions}: { title: string, transactions: PersonalAccountTransaction[] }) => {
    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={title} data={transactions} columns={[
                    {
                        accessorKey: 'customer',
                        header: 'Customer',
                        cell: ({row}: any) => <SidoohAccount account={row.original.account}/>
                    },
                    {
                        accessorKey: 'type',
                        header: 'Type',
                    },
                    {
                        accessorKey: 'description',
                        header: 'Description',
                    },
                    {
                        accessorKey: 'amount',
                        header: 'Amount',
                        cell: ({row}: any) => currencyFormat(row.original.amount)
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        cell: ({row}: any) => <StatusChip status={row.original.status}/>
                    },
                    {
                        accessorKey: 'created_at',
                        header: 'Created',
                        cell: ({row}: any) => <TableDate date={row.original.created_at}/>
                    },
                    {
                        id: 'actions',
                        header: '',
                        cell: ({row}: any) => (
                            <Link to={`/transactions/${row.original.id}`}>
                                <FontAwesomeIcon icon={faEye}/>
                            </Link>
                        )
                    }
                ]}/>
            </Card.Body>
        </Card>
    );
};

export default Transactions;
