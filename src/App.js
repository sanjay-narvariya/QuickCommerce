
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminLogin from "./components/admin/adminlogin/AdminLogin";
import Dashboard from "./components/admin/adminlogin/Dashboard";
import HomePage from "./components/userinterface/homepage/HomePage";
import PageCategoryDisplay from "./components/userinterface/pagedisplay/PageCategoryDisplay";
import ProductDetailPage from "./components/userinterface/productdetailspage/ProductDetailPage";
import MyCart from "./components/userinterface/mycart1/MyCart"
import SignIn from "./components/userinterface/signin/SignIn";
import Otp from "./components/userinterface/signin/Otp";
import SignUp from "./components/userinterface/signin/SignUp";
import MakePayment from "./components/userinterface/mycart1/MakePayment";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AdminLogin/>} path="/adminlogin"></Route>
          <Route element={<Dashboard/>} path="/dashboard/*"></Route>
          <Route element={<HomePage/>} path="/homepage"></Route>
          <Route element={<PageCategoryDisplay/>} path="/pagecategorydisplay"></Route>
          <Route element={<ProductDetailPage/>} path="/productdetailpage"></Route>
          <Route element={<MyCart/>} path="/mycart"></Route>
          
          <Route element={<SignIn/>} path="/signin"></Route>
          <Route element={<Otp/>} path="/otp"></Route>
          <Route element={<SignUp/>} path="/signup"></Route>
          <Route element={<MakePayment/>} path="/makepayment"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
