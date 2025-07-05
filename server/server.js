require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");  

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;

function fetchNews(url ,res) {
//   const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
    axios.get(url)
    .then(response => {
        if(response.data.totalResults > 0) {
            res.json({
                status: 200,
                success: true,
                message: "News fetched successfully",
                data: response.data
            });
        }
        else {
            res.json({
                status: 200,
                success: true,
                message: "No news found",
            });
        }
    })
    .catch(error => {
        res.json({
            status: 500,
            success: false,
            message: "Error fetching news",
            error: error.message
        });
    });
}

//all news
app.get("/news", (req, res) => {
    let pageSize=parseInt(req.query.pageSize) || 50;
    let page=parseInt(req.query.page) || 1;
    let url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});
//county
app.options("country/:iso", cors());
app.get("/country/:iso", (req, res) => {
    const country = req.params.iso;
    let pageSize = parseInt(req.query.pageSize) || 50;
    let page = parseInt(req.query.page) || 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

//top headlines
app.options("top-headlines", cors());
app.get("/top-headlines", (req, res) => {
    let country = req.query.country || "us";
    let category = req.query.category || "general";
    let pageSize = parseInt(req.query.pageSize) || 50;
    let page = parseInt(req.query.page) || 1;
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});