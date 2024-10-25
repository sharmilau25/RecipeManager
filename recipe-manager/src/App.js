import './App.css';
import  { BrowserRouter, Routes, Route, Router} from "react-router-dom";
import Home from './component/Home'
import Login from './component/Login';
import Signup from './component/Signup';
import Layout from './layout/Layout';
import Dashboard from './component/Dashboard';
import AllRecipes from './component/AllRecipes';
import RecipeDetails from './component/RecipeDetails';
function App() {
  return (
    <>
     <BrowserRouter>
     <Layout>
      <Routes>
          <Route index path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/allrecipes' element={<AllRecipes/>}/>
          <Route path="/recipes/:recipeId" element={<RecipeDetails />} /> {/* Dynamic route for recipe details */}
      </Routes>
      </Layout>
     </BrowserRouter>
    </>
  );
}

export default App;
