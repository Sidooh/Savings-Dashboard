import { CSSProperties, memo, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';

type SoftBadgeType = {
    bg?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark',
    pill?: boolean,
    children?: ReactNode,
    className?: string
    style?: CSSProperties;
    soft?: boolean;
    icon?: ReactNode;
    onClick?: MouseEventHandler<HTMLSpanElement>
};

const SoftBadge = ({bg = 'primary', pill, children, icon, soft = false, className, style, onClick}: SoftBadgeType) => {
    return (
        <span className={classNames(className, `badge badge-${soft ? 'soft' : ''}-${bg}`, {'rounded-pill': pill})}
              style={style}
              onClick={onClick}>
            {icon} {children}
        </span>
    );
};

export default memo(SoftBadge);
