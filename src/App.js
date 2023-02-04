import logo from './logo.svg';
import './_app.scss'
import DashboardLayout from './Templates/DashboardLayouts'
import ThemeConfig from './Component/Theme/index'
import Router from './routes'
function App() {
  return (
    <ThemeConfig>
      <Router/>
    </ThemeConfig>
  )
}
export default App;
