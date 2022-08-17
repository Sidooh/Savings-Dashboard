import { useParams } from 'react-router-dom';
import Transaction from '../Transaction';
import {
    useGetPersonalAccountTransactionQuery
} from 'features/personal-account-transactions/personalAccountTransactionApi';
import { SectionError, SectionLoader } from '@nabcellent/sui-react';

const ViewTransaction = () => {
    const { id } = useParams();
    const {
        data: transaction,
        isError,
        error,
        isLoading,
        isSuccess
    } = useGetPersonalAccountTransactionQuery(Number(id));

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transaction) return <SectionLoader/>;

    return <Transaction title={'Personal Account'} transaction={transaction}/>;
};

export default ViewTransaction;
