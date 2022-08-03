import { Status } from 'utils/enums';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Error, EventBusy, Info } from '@mui/icons-material';
import { useState } from 'react';
import SoftBadge from '../SoftBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHourglassStart } from '@fortawesome/free-solid-svg-icons';

const statusProps = (status: Status) => {
    let color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark' = 'dark', icon;

    if ([Status.COMPLETED, Status.ACTIVE].includes(status)) {
        color = 'success';
        icon = <FontAwesomeIcon icon={faCheck}/>;
    } else if (status === Status.PENDING) {
        color = 'warning';
        icon = <FontAwesomeIcon icon={faHourglassStart}/>;
    } else if (status === Status.REFUNDED) {
        color = 'info';
        icon = <Info/>;
    } else if ([Status.FAILED].includes(status)) {
        color = 'danger';
        icon = <Error/>;
    } else if ([Status.EXPIRED].includes(status)) {
        icon = <EventBusy fontSize={'small'}/>;
    }

    return {color, icon};
};

type StatusChipType = {
    status?: Status
    bg?: boolean
    soft?: boolean
}

const StatusChip = ({status, soft = true}: StatusChipType) => {
    if (!status) status = Status.FAILED;

    const {color, icon} = statusProps(status);

    const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | undefined>(undefined);
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(undefined);

    const menuItems = Object.values(Status).map(status => {
        const {icon} = statusProps(status);

        return {title: `Mark as ${status}`, icon, status};
    });

    return (
        <>
            <SoftBadge onClick={e => setAnchorEl(e.currentTarget)} soft={soft}
                       bg={color} className={`fw-bold fs-7`}
                       children={<span>{status}</span>}
                       icon={icon} pill/>
            <Menu
                anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'left',}}
                transformOrigin={{vertical: 'top', horizontal: 'left',}}>
                {
                    menuItems.map((item, i) => {
                        return (
                            <MenuItem key={`item-${i}`}>
                                <ListItemIcon>{item.icon}</ListItemIcon> {item.title}
                            </MenuItem>
                        );
                    })
                }
            </Menu>
        </>
    );
};

export default StatusChip;
