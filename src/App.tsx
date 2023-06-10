import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import { HashRouter, Route, Redirect, useHistory, useParams } from "react-router-dom";
import { userService } from './components/Services';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import OrderSummary from './components/OrderSummary';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
function App() {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [url, setUrl] = useState('');
  useEffect(() => {
    getCategories();
  }, []);
  async function getCategories() {
    const categorylists = await userService.getCategoriesList();
    setCategories(categorylists);
    const newurl = '/' + categorylists[0].slug;
    setUrl(newurl);
    setData(data);
    setIsLoading(false);
    // if (!isLoading && data) {
    //   history.push('/dth');
    // }
  }

  if (isLoading) {
    return <div id="preloader">
      <div data-loader="dual-ring"></div>
    </div>;
  }
  return (
    <HashRouter>
      <Header />
      <Route exact path="/:slug" component={Home} />
      {/* <Route exact path='/' component={Home} /> */}
      <Route exact path='/' component={Home} />
      <Route exact path="/pay/order-summary" component={OrderSummary} />
      <Route exact path="/pay/payment" component={Payment} />
      <Route exact path='/pay/payment-success' component={PaymentSuccess} />
      <Route exact path='/pay/payment-cancel' component={PaymentCancel} />
      {/* <Redirect to='/' /> */}
      <Footer />
    </HashRouter>
  );
}
export default App;
