import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import RecipeDetails from './screens/RecipeDetails';
import FavoriteRecipes from './screens/FavoriteRecipes';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoriteRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
