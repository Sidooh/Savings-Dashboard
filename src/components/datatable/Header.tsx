import { Button, Col, Form, Row } from 'react-bootstrap';
import { Checkbox, IconButton, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import pluralize from 'pluralize';
import { Str } from 'utils/helpers';
import { Table } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns } from '@fortawesome/free-solid-svg-icons';
import Flex from 'components/Flex';

interface Header {
    table: Table<any>;
    title: string;
    rowSelection: {};
    filtering: boolean;
    setFiltering: Dispatch<SetStateAction<boolean>>;
    onCreateRow?: () => void;
}

const Header = ({table, rowSelection, filtering, setFiltering, title, onCreateRow}: Header) => {
    const [action, setAction] = useState<string | undefined>(undefined);
    const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | undefined>(undefined);

    const selectedRowsCount = Object.keys(rowSelection).length;
    const tableTitle = pluralize(title, selectedRowsCount);

    const executeBulkAction = () => {
        const ids = table.getSelectedRowModel().rows.map(row => row.original.id);

        if (action === 'delete') console.log(ids)
    };

    return (
        <Row className="justify-content-between">
            <Col>
                <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                    {selectedRowsCount ? `You have selected ${selectedRowsCount} ${tableTitle}` : title}
                </h5>
            </Col>
            <Col sm="auto" className={'text-end'}>
                {selectedRowsCount ? (
                    <Flex>
                        <Form.Select size="sm" aria-label="Bulk actions" onChange={e => setAction(e.target.value)}>
                            <option value={''} hidden>Bulk Actions</option>
                            <option value="refund">Refund</option>
                            <option value="delete">Delete</option>
                        </Form.Select>
                        <Button variant="primary" size="sm" className="ms-2" onClick={() => executeBulkAction()}>
                            Apply
                        </Button>
                    </Flex>
                ) : (
                    <Flex>
                        {onCreateRow && (
                            <Button size="sm" className="me-2" onClick={onCreateRow} variant={'success'}>
                                <span className="d-none d-sm-inline-block ms-1">New</span>
                            </Button>
                        )}
                        <Tooltip title={`${filtering ? 'Disable' : 'Enable'} Filtering`}>
                            <Form.Check type="switch" checked={filtering} onChange={() => setFiltering(!filtering)}/>
                        </Tooltip>
                        <Tooltip title={`Show Columns`}>
                            <IconButton aria-controls={Boolean(anchorEl) ? 'demo-positioned-menu' : undefined}
                                    aria-haspopup="true" aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                                    onClick={e => setAnchorEl(e.currentTarget)}>
                                <FontAwesomeIcon icon={faTableColumns} size={'sm'}/>
                            </IconButton>
                        </Tooltip>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(undefined)}
                              anchorOrigin={{vertical: 'top', horizontal: 'left',}}
                              transformOrigin={{vertical: 'top', horizontal: 'left',}}>
                            <MenuItem>
                                <Checkbox checked={table.getIsAllColumnsVisible()}
                                          onChange={table.getToggleAllColumnsVisibilityHandler()}/>
                                <ListItemText primary={'Toggle All'}/>
                            </MenuItem>
                            {table.getAllLeafColumns().map(column => (
                                <MenuItem key={column.id}>
                                    <Checkbox checked={column.getIsVisible()}
                                              onChange={column.getToggleVisibilityHandler()}/>
                                    <ListItemText primary={typeof column.columnDef.header === 'string'
                                        ? column.columnDef.header
                                        : Str.headline(column.id)}/>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Flex>
                )}
            </Col>
        </Row>
    );
};

export default Header;
