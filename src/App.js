import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import ProductTable from './components/ProductTable';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <header style={{ padding: '1rem', textAlign: 'center' }}>
                    <h1>Product and Category Management</h1>
                </header>
                <main style={{ padding: '2rem' }}>
                    <ProductTable />
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;
