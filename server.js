require("module-alias/register");
require("dotenv").config();
const express = require("express");
const assignHeader = require("@/config/header/index");
const handleRoutes = require("@/routes/index");

const app = express();
assignHeader(app);
handleRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
