import { useGetPersonalAccountTransactionQuery } from 'features/personal-accounts/personalAccountApi';
import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import SavingsTransactionTable from 'components/tables/SavingsTransactionTable';

const Transactions = () => {
    let {data: transactions, isLoading, isSuccess, isError, error} = useGetPersonalAccountTransactionQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <SectionLoader/>;

    console.log(transactions);

    return <SavingsTransactionTable title={'Personal Account Transactions'} transactions={transactions}/>;
};

export default Transactions;
