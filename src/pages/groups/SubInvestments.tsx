import { currencyFormat, DataTable, SectionError, SectionLoader, TableDate } from '@nabcellent/sui-react';
import { Card } from 'react-bootstrap';
import { SubInvestment } from 'utils/types';
import { useGetGroupSubInvestmentsQuery } from 'features/groups/groupsApi';
import { Link } from 'react-router-dom';
import { logger } from 'utils/logger';

const SubInvestments = () => {
    let {data: investments, isLoading, isSuccess, isError, error} = useGetGroupSubInvestmentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !investments) return <SectionLoader/>;

    logger.log(investments);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={'Group Sub Investments'} data={investments} columns={[
                    {
                        accessorKey: 'group',
                        header: 'Group',
                        cell: ({row: {original}}: { row: { original: SubInvestment } }) => (
                            <Link to={`/groups/${original.group.id}`}>{original.group.name}</Link>
                        )
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
