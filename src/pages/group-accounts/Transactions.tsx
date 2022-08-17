import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import SavingsTransactionTable from 'components/tables/SavingsTransactionTable';
import { useGetGroupAccountTransactionQuery } from 'features/group-accounts/groupAccountApi';

const Transactions = () => {
    let {data: transactions, isLoading, isSuccess, isError, error} = useGetGroupAccountTransactionQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <SectionLoader/>;

    console.log(transactions);

    return <SavingsTransactionTable title={'Group Account Transactions'} transactions={transactions}/>;
};

export default Transactions;
