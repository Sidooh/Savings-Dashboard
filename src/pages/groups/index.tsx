import { currencyFormat, DataTable, SectionError, SectionLoader, StatusChip } from '@nabcellent/sui-react';
import { Card } from 'react-bootstrap';
import { useGetGroupsQuery } from 'features/groups/groupsApi';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { logger } from 'utils/logger';

const Index = () => {
    let {data: groups, isLoading, isSuccess, isError, error} = useGetGroupsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !groups) return <SectionLoader/>;

    logger.log(groups);

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={'Groups'} data={groups} columns={[
                    {
                        accessorKey: 'name',
                        header: 'Name',
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
                    {
                        id: 'actions',
                        header: '',
                        cell: ({ row }: any) => (
                            <Link to={`/groups/${row.original.id}`}><FontAwesomeIcon icon={faEye}/></Link>
                        )
                    }
                ]}/>
            </Card.Body>
        </Card>
    );
};

export default Index;
