import { CONFIG } from 'config';
import PhoneChip from 'components/chips/PhoneChip';
import { Account } from '../utils/types';

const SidoohAccount = ({account}: { account: Account }) => {
    if (!account) return null;

    return (
        <span>
            {account?.user?.name} {account?.user?.name && <br/>}
            <a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${account.id}`} target={'_blank'}>
                <PhoneChip phone={account.phone}/>
            </a>
        </span>
    );
};

export default SidoohAccount;
