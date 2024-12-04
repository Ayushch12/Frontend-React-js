
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../features/productsSlice";
import { fetchCategories } from "../features/categoriesSlice";
import { DataGrid } from "@mui/x-data-grid";
import {
    Paper,
    Button,
    Box,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductTable = () => {
    const dispatch = useDispatch();
    const { items: products } = useSelector((state) => state.products);
    const { items: categories } = useSelector((state) => state.categories);

    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleOpenDialog = (product = null) => {
        setCurrentProduct(product || { name: "", description: "", price: "", category: "" });
        setIsEditing(!!product);
        setOpenDialog(true);
    };


    const handleCloseDialog = () => {
        setCurrentProduct(null);
        setIsEditing(false);
        setOpenDialog(false);
    };


    const handleOpenDeleteDialog = (product) => {
        setCurrentProduct(product);
        setOpenDeleteDialog(true);
    };


    const handleCloseDeleteDialog = () => {
        setCurrentProduct(null);
        setOpenDeleteDialog(false);
    };


    const handleSave = () => {
        const productToSave = {
            ...currentProduct,
            createdAt: isEditing
                ? currentProduct.createdAt
                : new Date().toISOString(),
        };

        if (isEditing) {
            dispatch(updateProduct(productToSave));
        } else {
            dispatch(createProduct(productToSave));
        }

        handleCloseDialog();
    };


    const handleConfirmDelete = () => {
        if (currentProduct?.id) {
            dispatch(deleteProduct(currentProduct.id));
        }
        handleCloseDeleteDialog();
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const formatDate = (dateString) => {
        const options = { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };


    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "description", headerName: "Description", width: 250 },
        { field: "price", headerName: "Price", width: 120 },
        {
            field: "category",
            headerName: "Category",
            width: 200,
            valueGetter: (params) => params.row?.category?.name || "N/A",
        },
        {
            field: "createdAt",
            headerName: "Creation Date",
            width: 200,
            valueGetter: (params) => {
                const createdAt = params.row?.createdAt;
                return createdAt ? formatDate(createdAt) : "N/A";
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Box>
                    <IconButton onClick={() => handleOpenDialog(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleOpenDeleteDialog(params.row)}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const rows = products || [];

    return (
        <Box sx={{ padding: "1rem", marginTop: "1rem" }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <h2></h2>
                <Button
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        height: "30px",
                        backgroundColor: "#5A7BEF",
                        "&:hover": {
                            backgroundColor: "#4A6BD6",
                        },
                    }}
                    onClick={() => handleOpenDialog()}
                >
                    + Add Product
                </Button>
            </Box>


            <Paper sx={{ height: 600, width: "100%", padding: "1rem" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    getRowId={(row) => row.id}
                    sx={{
                        border: "none",
                    }}
                />
            </Paper>


            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullScreen
                PaperProps={{
                    sx: {
                        position: "fixed",
                        right: 0,
                        top: 0,
                        height: "100%",
                        width: "400px",
                        margin: 0,
                        borderRadius: "2rem 0 0 2rem",
                    },
                }}
            >
                <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        name="name"
                        value={currentProduct?.name || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        name="description"
                        value={currentProduct?.description || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        name="price"
                        value={currentProduct?.price || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Category"
                        fullWidth
                        name="category"
                        value={currentProduct?.category || ""}
                        onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                maxWidth="sm"
                fullScreen
                PaperProps={{
                    sx: {
                        position: "fixed",
                        right: 0,
                        top: 0,
                        height: "100%",
                        width: "400px",
                        margin: 0,
                        borderRadius: "2rem 0 0 2rem",
                    },
                }}
            >
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this product:{" "}
                        <strong>{currentProduct?.name}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductTable;






