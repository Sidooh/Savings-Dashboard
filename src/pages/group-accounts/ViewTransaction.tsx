import { useParams } from 'react-router-dom';
import Transaction from '../Transaction';
import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import { useGetGroupAccountTransactionQuery } from 'features/group-accounts/groupAccountApi';

const ViewTransaction = () => {
    const {id} = useParams();
    const {data: transaction, isError, error, isLoading, isSuccess} = useGetGroupAccountTransactionQuery(Number(id));

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transaction) return <SectionLoader/>;

    return <Transaction title={'Group Account'} transaction={transaction}/>;
};

export default ViewTransaction;
