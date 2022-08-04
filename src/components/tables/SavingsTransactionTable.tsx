import { PersonalAccountTransaction } from '../../utils/types';
import DataTable from '../datatable';
import { Card } from 'react-bootstrap';
import SidoohAccount from 'components/SidoohAccount';
import { currencyFormat } from '../../utils/helpers';
import StatusChip from '../chips/StatusChip';
import TableDate from '../TableDate';

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
                ]}/>
            </Card.Body>
        </Card>
    );
};

export default Transactions;
