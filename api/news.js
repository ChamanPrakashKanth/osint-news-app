export default async function handler(req, res) {

const apiKey = "9c97aa114116452fb7e4dc45a3d55431";

const url =
`https://newsapi.org/v2/everything?q=military OR cyber OR space OR missile OR defense&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

const response = await fetch(url);

const data = await response.json();

res.status(200).json(data);

}
