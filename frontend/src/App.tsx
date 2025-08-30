import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUp.page';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/signup2' element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
};

export default App;