import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Collapse, Nav } from 'react-bootstrap';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTheme } from 'features/theme/themeSlice';
import { RouteChildType } from 'utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip } from '@mui/material';
import Flex from 'components/Flex';

type CollapseItemsType = {
    route: RouteChildType
};

type NavbarVerticalMenuItemType = {
    route: RouteChildType
};

const NavbarVerticalMenuItem = ({route}: NavbarVerticalMenuItemType) => (
    <Flex alignItems="center">
        {route.icon && <span className="nav-link-icon"><FontAwesomeIcon icon={route.icon}/></span>}
        <span className="nav-link-text ps-1">{route.name}</span>
        {route.badge && <Chip label={route.badge.text} color={route.badge.type} className={'ms-2'}/>}
    </Flex>
);

const CollapseItems = ({route}: CollapseItemsType) => {
    const {pathname} = useLocation();

    const openCollapse = (childrens: RouteChildType[] | undefined) => {
        if (!childrens) return;
        const checkLink = (children: RouteChildType) => {
            if (children.to === pathname) return true;

            return (
                Object.prototype.hasOwnProperty.call(children, 'children') &&
                children.children?.some(checkLink)
            );
        };

        return childrens.some(checkLink);
    };

    const [open, setOpen] = useState(openCollapse(route.children));

    return (
        <Nav.Item as="li">
            <Nav.Link onClick={() => setOpen(!open)}
                      className={classNames('dropdown-indicator cursor-pointer', {'text-500': !route.active})}
                      aria-expanded={open}>
                <NavbarVerticalMenuItem route={route}/>
            </Nav.Link>
            <Collapse in={open}>
                <Nav className="flex-column nav" as="ul">
                    {route.children && <NavbarVerticalMenu routes={route.children}/>}
                </Nav>
            </Collapse>
        </Nav.Item>
    );
};

const NavbarVerticalMenu = ({routes}: { routes: RouteChildType[] }) => {
    const dispatch = useAppDispatch();
    const {showBurgerMenu} = useAppSelector((state) => state.theme);

    const handleNavItemClick = () => {
        if (showBurgerMenu) dispatch(setTheme({key: 'showBurgerMenu', value: !showBurgerMenu}));
    };

    return (
        <>
            {routes.map(route => {
                if (!route.children) {
                    return (
                        <Nav.Item as="li" key={route.name} onClick={handleNavItemClick}>
                            <NavLink end={route.exact} to={String(route.to)}
                                     state={{open: route.to === '/authentication-modal'}}
                                     className={({isActive}) => isActive ? 'active nav-link' : 'nav-link'}>
                                <NavbarVerticalMenuItem route={route}/>
                            </NavLink>
                        </Nav.Item>
                    );
                }

                return <CollapseItems route={route} key={route.name}/>;
            })}
        </>
    );
};

export default NavbarVerticalMenu;
