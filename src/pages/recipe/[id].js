import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../components/navbar"));
const RecipeDetail = dynamic(() => import("../../components/RecipeDetail"), {
  loading: () => <p>Loading recipe…</p>,
  ssr: false,
});

const RecipePage = () => {
  const { query } = useRouter();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (query.id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.meals) {
            setRecipe(data.meals[0]);
          }
        });
    }
  }, [query.id]);

  return (
    <div>
      <Navbar />
      {recipe ? (
        <RecipeDetail recipe={recipe} />
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading recipe...
        </p>
      )}
    </div>
  );
};

export default RecipePage;
