import Flex from 'components/Flex';
import { Form } from 'react-bootstrap';
import { Button, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Table } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAnglesLeft,
    faAnglesRight,
    faArrowLeft,
    faArrowRight,
    faArrowRightLong
} from '@fortawesome/free-solid-svg-icons';

const Footer = ({table, rowSelection, viewAllLink}: { table: Table<any>, rowSelection: {}, viewAllLink: string }) => {
    const navigate = useNavigate();

    const selectedRowsCount = Object.keys(rowSelection).length;

    return (
        <Flex alignItems={'center'} justifyContent={'between'}>
            <Flex alignItems="center" className="fs--1">
                <p className="mb-0">
                    <span>Page </span>
                    <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
                </p>
                <p className="mb-0 ms-2">Rows per page:</p>
                <Form.Select size="sm" className="w-auto mx-2" value={table.getState().pagination.pageSize}
                             onChange={e => table.setPageSize(Number(e.target.value))}>
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                    ))}
                </Form.Select>
                {Boolean(selectedRowsCount) && (
                    <div>
                        {selectedRowsCount} of{' '}
                        {table.getPreFilteredRowModel().rows.length} Total Rows Selected
                    </div>
                )}

                <span>Total: {table.getRowModel().rows.length}</span>
            </Flex>
            <Flex>
                {
                    viewAllLink &&
                    <Button size="small" onClick={() => navigate(viewAllLink)}>
                        <span className="d-none d-sm-inline-block ms-1">View All</span>
                        <FontAwesomeIcon icon={faArrowRightLong} fontSize={15}/>
                    </Button>
                }
                <IconButton disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>
                    <FontAwesomeIcon icon={faAnglesLeft} fontSize={15}/>
                </IconButton>
                <IconButton disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
                    <FontAwesomeIcon icon={faArrowLeft} fontSize={15}/>
                </IconButton>
                <IconButton disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
                    <FontAwesomeIcon icon={faArrowRight} fontSize={15}/>
                </IconButton>
                <IconButton disabled={!table.getCanNextPage()}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    <FontAwesomeIcon icon={faAnglesRight} fontSize={15}/>
                </IconButton>
            </Flex>
        </Flex>
    );
};

Footer.propTypes = {
    table: PropTypes.object.isRequired,
    rowSelection: PropTypes.object.isRequired,
    viewAllLink: PropTypes.string,
};

export default Footer;
