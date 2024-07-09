import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn"
import Revenue from "./pages/Revenue";
import AddRevenue from "./pages/AddRevenue";
import { useAppContext } from './context/AppContext';

const App = () => {

  const { isLoggedIn } = useAppContext();
  
  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            <Layout>
              {isLoggedIn ? (
                <p>Home Page</p>
              ) : (
                <SignIn />
              )}
            </Layout>
          }
        />

        <Route
          path="/register"
          element={
            <Layout>
              <Register/>
            </Layout>
          }
        />

        <Route
          path="/signin"
          element={
            <Layout>
              <SignIn/>
            </Layout>
          }
        />

        <Route
          path="/overview"
          element={
            <Layout>
              Overview
            </Layout>
          }
        />

        <Route
          path="/expense"
          element={
            <Layout>
              Expenses
            </Layout>
          }
        />

        <Route
          path="/revenue"
          element={
            <Layout>
              <Revenue/>
            </Layout>
          }
        />

        <Route
          path="/addrevenue"
          element={
            <Layout>
              <AddRevenue/>
            </Layout>
          }
        />

        
        
      </Routes>
    </Router>
  )
}


export default App
