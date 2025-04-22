export default async function handler(req, res) {
  const { ingredients } = req.query;

  if (!ingredients) {
    return res.status(400).json({ message: 'Ingredients query is required' });
  }

  
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.meals) {
      res.status(200).json(data.meals);
    } else {
      res.status(404).json({ message: 'No recipes found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
}
