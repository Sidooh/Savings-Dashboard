import { CollectiveInvestment, PersonalAccountTransaction } from 'utils/types';
import { Card } from 'react-bootstrap';
import { currencyFormat, DataTable, TableDate } from '@nabcellent/sui-react';
import moment from 'moment/moment';

const CollectiveInvestmentsTable = ({title, investments}: { title: string, investments: CollectiveInvestment[] }) => {
    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable title={title} data={investments} columns={[
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
                        accessorKey: 'invested_at',
                        header: 'Investment Date',
                        cell: ({row: {original}}: { row: { original: CollectiveInvestment } }) => <TableDate
                            date={original.invested_at ?? original.investment_date}/>
                    },
                    {
                        accessorKey: 'maturity_date',
                        header: 'Maturity',
                        cell: ({row}: any) => <TableDate date={row.original.maturity_date}/>
                    },
                    {
                        accessorKey: 'created_at',
                        header: 'Created',
                        accessorFn: (row: PersonalAccountTransaction) => moment(row.created_at).calendar(),
                        cell: ({row}: any) => <TableDate date={row.original.created_at}/>
                    },
                ]}/>
            </Card.Body>
        </Card>
    );
};

export default CollectiveInvestmentsTable;
