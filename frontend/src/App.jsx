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
import Expense from "./pages/Expense";
import AddExpense from "./pages/AddExpense"
import EditRevenue from "./pages/EditRevenue";
import EditExpense from "./pages/EditExpense";
import OverviewPage from "./pages/Overview";


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
                <OverviewPage/>
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
              <OverviewPage/>
            </Layout>
          }
        />

        <Route
          path="/expense"
          element={
            <Layout>
              <Expense/>
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

        <Route
          path="/addexpense"
          element={
            <Layout>
              <AddExpense/>
            </Layout>
          }
        />

        <Route
          path="/edit-revenue/:id"
          element={
            <Layout>
              <EditRevenue/>
            </Layout>
          }
        />

        <Route
          path="/edit-expense/:id"
          element={
            <Layout>
              <EditExpense/>
            </Layout>
          }
        />
        
        
      </Routes>
    </Router>
  )
}


export default App
