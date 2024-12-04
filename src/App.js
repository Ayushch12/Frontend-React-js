import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import ProductTable from './components/ProductTable';
import Typography from '@mui/material/Typography';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <header style={{ padding: '1rem', textAlign: 'center' }}>
                <Typography
                        variant="h4"
                        component="h1"
                        style={{ fontWeight: 'bold', color: theme.palette.primary.main }}
                    >
                        Product and Category Management
                    </Typography>
                </header>
                <main style={{ padding: '2rem' }}>
                    <ProductTable />
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;
