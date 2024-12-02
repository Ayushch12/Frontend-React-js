import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, addCategory, deleteCategory } from "../services/api";


export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const response = await getCategories();
    return response;
});


export const createCategory = createAsyncThunk("categories/createCategory", async (category) => {
    const response = await addCategory(category);
    return response;
});


export const removeCategory = createAsyncThunk("categories/removeCategory", async (id) => {
    await deleteCategory(id);
    return id;
});

const categoriesSlice = createSlice({
    name: "categories",
    initialState: { items: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.items = state.items.filter((category) => category.id !== action.payload);
            });
    },
});

export default categoriesSlice.reducer;
