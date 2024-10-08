import { useGetPersonalSubInvestmentsQuery } from 'features/personal-accounts/personalAccountApi';
import { currencyFormat, DataTable, SectionError, SectionLoader, TableDate } from '@nabcellent/sui-react';
import { Card } from 'react-bootstrap';
import SidoohAccount from 'components/SidoohAccount';
import { SubInvestment } from 'utils/types';
import { logger } from 'utils/logger';

const SubInvestments = () => {
    let {data: investments, isLoading, isSuccess, isError, error} = useGetPersonalSubInvestmentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !investments) return <SectionLoader/>;

    logger.log(investments);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={'Personal Account Sub Investments'} data={investments} columns={[
                    {
                        accessorKey: 'user',
                        header: 'User',
                        cell: ({row}: any) => <SidoohAccount account={row.original.account}/>
                    },
                    {
                        accessorKey: 'type',
                        header: 'Type',
                        accessorFn: (row: SubInvestment) => row.personal_account.type,
                    },
                    {
                        accessorKey: 'amount',
                        header: 'Amount',
                        cell: ({row}: any) => currencyFormat(row.original.amount)
                    },
                    {
                        accessorKey: 'interest',
                        header: 'Interest',
                        cell: ({row}: any) => currencyFormat(row.original.interest)
                    },
                    {
                        accessorKey: 'created_at',
                        header: 'Created',
                        cell: ({row}: any) => <TableDate date={row.original.created_at}/>
                    },
                ]}/>
            </Card.Body>
        </Card>
    )
};

export default SubInvestments;
