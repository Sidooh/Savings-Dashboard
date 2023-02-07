import { PersonalAccountTransaction } from 'utils/types';
import { Card } from 'react-bootstrap';
import SidoohAccount from 'components/SidoohAccount';
import { currencyFormat, DataTable, StatusChip, TableDate, TransactionTypeChip } from '@nabcellent/sui-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

type SavingsTransactionTableProps = {
    title: string,
    transactions: PersonalAccountTransaction[],
    entity: 'personal-accounts' | 'group-accounts'
    showAccount?: boolean
}

const SavingsTransactionTable = ({
    title,
    transactions,
    entity,
    showAccount = true
}: SavingsTransactionTableProps) => {
    const columns = [
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }: any) => <TransactionTypeChip type={row.original.type}/>
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: ({ row }: any) => currencyFormat(row.original.amount)
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }: any) => <StatusChip status={row.original.status}/>
        },
        {
            accessorKey: 'created_at',
            header: 'Created',
            accessorFn: (row: PersonalAccountTransaction) => moment(row.created_at).calendar(),
            cell: ({ row }: any) => <TableDate date={row.original.created_at}/>
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }: any) => (
                <Link to={`/${entity}/transactions/${row.original.id}`}>
                    <FontAwesomeIcon icon={faEye}/>
                </Link>
            )
        }
    ];

    if (showAccount) columns.unshift({
        accessorKey: 'account',
        header: 'Account',
        accessorFn: (row: PersonalAccountTransaction) => `${row?.account?.phone}: ${row?.account?.user?.name}`,
        cell: ({ row }: any) => <SidoohAccount account={row.original.account}/>
    });

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={title} data={transactions} columns={columns}/>
            </Card.Body>
        </Card>
    );
};

export default SavingsTransactionTable;
