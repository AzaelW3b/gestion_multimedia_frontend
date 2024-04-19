import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableFooter,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Stack,
    Button,
} from "@mui/material"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import PropTypes from "prop-types"
import useAuth from "../../hooks/useAuth"

const tableStyles = {
    tableHeaderCell: {
        color: "#757575",
        fontWeight: 700,
        fontSize: "12px",
    },
    tableCell: {
        color: "#212121DE",
        fontWeight: 400,
        fontSize: "14px",
    },
    iconBlue: {
        color: "#2196F3",
    },
    iconOption: {
        color: "#2196F3",
        fontSize: "12px",
        fontWeight: 600,
        textTransform: "none",
    },
}
const ROLE_READER = "reader"
const ROLE_ADMIN = "admin"

export function TableCard({
    displayColumns,
    dataSource,
    editFunction,
    deleteFunction,
    handleClickDetalles,
    handleClickUser,
    setPage,
    page
}) {
    const [rowsPerPage, setRowsPerPage] = useState(15)
    const [selectedRow, setSelectedRow] = useState(null)

    const { user } = useAuth()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleClickRow = (rowId) => {
        setSelectedRow(rowId === selectedRow ? null : rowId)
    }

    const [anchorEl, setAnchorEl] = useState(null)
    const [currentElement, setCurrentElement] = useState(null)
    const [open, setOpen] = useState(false)

    const handleMenuClick = (event, data) => {
        setAnchorEl(event.currentTarget)
        setCurrentElement(data)
        setSelectedRow(dataSource?.findIndex((item) => item === data))
        setOpen(true)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setCurrentElement(null)
        setOpen(false)
    }

    const handleMenuItemClick = (accion, data) => {
        if (accion === "edit") {
            editFunction(data)
        } else if (accion === "delete") {
            deleteFunction(data)
        }

        handleClose()
    }



    return (
        <div style={{ maxWidth: "83vw", paddingBottom: 40 }}>
            {
                user?.userType !== ROLE_READER && (
                    <Stack
                        spacing={{ xs: 4, md: 2 }}
                        direction={{ sm: "column", md: "row" }}
                        justifyContent="space-between"
                        sx={{ my: 3 }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleClickUser}
                            startIcon={<AddIcon />}
                            sx={{
                                background: "#2196F3",
                                fontSize: "12px",
                                textTransform: "none",
                                boxShadow: "none",
                                width: "98px",
                                height: "36px",
                            }}
                        >
                            Nuevo
                        </Button>
                    </Stack>
                )
            }

            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {displayColumns?.map((column, columnIndex) => (
                                <TableCell key={columnIndex} sx={tableStyles.tableHeaderCell}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? dataSource?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            : dataSource
                        )?.map((data, index) => (
                            <TableRow
                                key={index}
                                onClick={() => handleClickRow(index)}
                                selected={selectedRow === index}
                                hover
                            >
                                {Object.entries(data).map(
                                    ([key, value]) =>
                                        key !== "_id" && key !== "__v" && (
                                            <TableCell
                                                onClick={() => handleClickDetalles(data)}
                                                key={"col" + key}
                                                sx={tableStyles.tableCell}
                                            >
                                                {key === "status" ? (
                                                    <Chip
                                                        label={value}
                                                        sx={[
                                                            {
                                                                background:
                                                                    (value?.toLowerCase() === "activa" || value?.toLowerCase() === "activo")
                                                                        ? "#29BF3833"
                                                                        : "#E72C2C33",
                                                            },
                                                            tableStyles.tableCell,
                                                        ]}
                                                    />
                                                ) : (
                                                    value
                                                )}
                                            </TableCell>
                                        )
                                )}
                                {
                                    user?.userType !== ROLE_READER && (
                                        <TableCell>
                                            <div>
                                                <IconButton
                                                    id="basic-button"
                                                    aria-controls={open ? "basic-menu" : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? "true" : undefined}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleMenuClick(e, data)
                                                    }}
                                                >
                                                    <MoreHorizOutlinedIcon />
                                                </IconButton>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    elevation={1}
                                                >
                                                    <MenuItem
                                                        onClick={() =>
                                                            handleMenuItemClick("edit", currentElement)
                                                        }
                                                    >
                                                        <ListItemIcon>
                                                            <BorderColorOutlinedIcon
                                                                fontSize="small"
                                                                sx={tableStyles.iconBlue}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText>Editar</ListItemText>
                                                    </MenuItem>
                                                    {
                                                        user?.userType === ROLE_ADMIN && (
                                                            <MenuItem
                                                                onClick={() =>
                                                                    handleMenuItemClick("delete", currentElement)
                                                                }
                                                            >
                                                                <ListItemIcon>
                                                                    <DeleteIcon
                                                                        fontSize="small"
                                                                        sx={tableStyles.iconBlue}
                                                                    />
                                                                </ListItemIcon>
                                                                <ListItemText>Eliminar</ListItemText>
                                                            </MenuItem>
                                                        )
                                                    }
                                                </Menu>
                                            </div>
                                        </TableCell>
                                    )
                                }

                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                labelRowsPerPage="Filas por página:"
                                rowsPerPageOptions={[5, 10, 15, 20]}
                                component="td"
                                count={dataSource?.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                sx={{
                                    "& .MuiTablePagination-actions": {
                                        color: "#2196F3",
                                    },
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

        </div>
    )
}

TableCard.propTypes = {
    displayColumns: PropTypes.array,
    dataSource: PropTypes.array,
    editFunction: PropTypes.func,
    deleteFunction: PropTypes.func,
    handleClick: PropTypes.func,
    handleClickDetalles: PropTypes.func,
    handleClickUser: PropTypes.func,
    setItemBusqueda: PropTypes.func,
    itemBusqueda: PropTypes.string,
    inputBusqueda: PropTypes.string,
    selectsBusqueda: PropTypes.array,
    setPage: PropTypes.func,
    page: PropTypes.number
}
