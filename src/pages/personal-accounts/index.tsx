import { useGetPersonalAccountsQuery } from 'features/personal-accounts/personalAccountApi';
import { SectionError } from 'components/Error';
import { SectionLoader } from 'components/Loader';
import { Card } from 'react-bootstrap';
import DataTable from 'components/datatable';
import { currencyFormat } from 'utils/helpers';
import StatusChip from 'components/chips/StatusChip';
import SidoohAccount from 'components/SidoohAccount';

const Index = () => {
    let {data: accounts, isLoading, isSuccess, isError, error} = useGetPersonalAccountsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !accounts) return <SectionLoader/>;

    console.log(accounts);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={'Personal Accounts'} data={accounts} columns={[
                    {
                        accessorKey: 'customer',
                        header: 'Customer',
                        cell: ({row}: any) => <SidoohAccount account={row.original.account}/>
                    },
                    {
                        accessorKey: 'target_amount',
                        header: 'Target',
                        cell: ({row}: any) => currencyFormat(row.original.target_amount)
                    },
                    {
                        accessorKey: 'balance',
                        header: 'Balance',
                        cell: ({row}: any) => currencyFormat(row.original.balance)
                    },
                    {
                        accessorKey: 'interest',
                        header: 'Interest',
                        cell: ({row}: any) => currencyFormat(row.original.interest)
                    },
                    {
                        accessorKey: 'type',
                        header: 'Type',
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        cell: ({row}: any) => <StatusChip status={row.original.status}/>
                    },
                ]}/>
            </Card.Body>
        </Card>
    );
};

export default Index;
