import { SectionError } from 'components/Error';
import { SectionLoader } from 'components/Loader';
import { Card } from 'react-bootstrap';
import DataTable from 'components/datatable';
import { SubInvestment } from 'utils/types';
import { currencyFormat } from 'utils/helpers';
import TableDate from 'components/TableDate';
import { useGetGroupSubInvestmentsQuery } from 'features/groups/groupsApi';
import { Link } from 'react-router-dom';

const SubInvestments = () => {
    let {data: investments, isLoading, isSuccess, isError, error} = useGetGroupSubInvestmentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !investments) return <SectionLoader/>;

    console.log(investments);

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
