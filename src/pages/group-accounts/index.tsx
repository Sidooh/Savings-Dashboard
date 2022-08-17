import { Card } from 'react-bootstrap';
import { useGetGroupAccountsQuery } from 'features/group-accounts/groupAccountApi';
import { Link } from 'react-router-dom';
import { GroupAccount } from 'utils/types';
import SidoohAccount from 'components/SidoohAccount';
import { currencyFormat, DataTable, SectionError, SectionLoader, StatusChip, TableDate } from '@nabcellent/sui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

const Index = () => {
    let {data: accounts, isLoading, isSuccess, isError, error} = useGetGroupAccountsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !accounts) return <SectionLoader/>;

    console.log(accounts);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={'Group Accounts'} data={accounts} columns={[
                    {
                        accessorKey: 'user',
                        header: 'User',
                        cell: ({row}: any) => <SidoohAccount account={row.original.account}/>
                    },
                    {
                        accessorKey: 'group',
                        header: 'Group',
                        cell: ({row: {original}}: { row: { original: GroupAccount } }) => (
                            <Link to={`/groups/${original.group.id}`}>{original.group.name}</Link>
                        )
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
    );
};

export default Index;
