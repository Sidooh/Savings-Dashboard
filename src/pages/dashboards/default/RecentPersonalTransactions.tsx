import { ComponentLoader, SectionError } from '@nabcellent/sui-react';
import { useGetRecentPersonalAccountTransactionQuery } from 'features/savings/savingsApi';
import SavingsTransactionTable from 'components/tables/SavingsTransactionTable';

const RecentPersonalTransactions = () => {
    let { data: transactions, isLoading, isSuccess, isError, error } = useGetRecentPersonalAccountTransactionQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <ComponentLoader/>;

    console.log(transactions);

    return <SavingsTransactionTable title={'Recent Personal Transactions'} transactions={transactions}
                                    entity={'personal-accounts'}/>;
};

export default RecentPersonalTransactions;
