import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { OnboardingStepper } from './pages/Onboarding.page';

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
          <Route path='/' element={<OnboardingStepper />} />
          <Route path='/onboarding' element={<OnboardingStepper />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
};

export default App;