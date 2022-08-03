import PropTypes from 'prop-types';
import { getTelcoFromPhone, parsePhone } from 'utils/helpers';
import { Telco } from 'utils/enums';
import { Chip } from '@mui/material';
import { Phone } from '@mui/icons-material';

type PhoneChipType = {
    phone?: string | number
    bg?: boolean
    link?: boolean
    textOnly?: boolean
}

const PhoneChip = ({phone, bg = false, link = true, textOnly = true}: PhoneChipType) => {
    if (!phone) return <></>;

    const telco = getTelcoFromPhone(phone);
    let color = 'secondary',
        phoneNumber = phone ? parsePhone(phone) : 'N/A';

    if (telco === Telco.SAFARICOM) {
        color = '#59BC58';
    } else if (telco === Telco.AIRTEL) {
        color = '#EE4326';
    } else if (telco === Telco.TELKOM) {
        color = '#30AACB';
    }

    if (textOnly) return <span className={'fw-bolder'} style={{color}}>{String(phoneNumber).substring(1)}</span>;

    return (
        <Chip component={'a'} href={(link && phone) ? `tel:${phone}` : '#'}
              icon={<Phone style={{color}}/>}
              variant={bg ? 'filled' : 'outlined'}
              sx={{px: .5, bgcolor: bg ? color : '', borderColor: bg ? '' : color, color: bg ? '' : color}}
              className={`font-size-12`}
              label={<b>{String(phoneNumber).substring(1)}</b>}
        />
    );
};

PhoneChip.propTypes = {
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bg: PropTypes.bool,
    link: PropTypes.bool
};

export default PhoneChip;
