import {
    useGetPersonalAccountTransactionsQuery
} from 'features/personal-account-transactions/personalAccountTransactionApi';
import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import SavingsTransactionTable from 'components/tables/SavingsTransactionTable';

const Transactions = () => {
    let { data: transactions, isLoading, isSuccess, isError, error } = useGetPersonalAccountTransactionsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <SectionLoader/>;

    console.log(transactions);

    return <SavingsTransactionTable title={'Personal Account Transactions'} transactions={transactions}
                                    entity={'personal-accounts'}/>;
};

export default Transactions;
