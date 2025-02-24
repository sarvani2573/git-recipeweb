
import './App.css';
import Footer from './comp/footer';
import Header from './comp/header';
import ItemList from './comp/itemslist';
import Nav from './comp/nav';

function App() {
  return (
    <div className="App">
     <Header/>
     <Nav/>
     <ItemList/>
     <Footer/>
    </div>
  );
}

export default App;
