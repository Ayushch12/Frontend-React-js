import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";

const ProductTable = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === "loading") return <CircularProgress />;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <Paper style={{ padding: "1rem", marginTop: "1rem" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.category?.name || "N/A"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default ProductTable;
