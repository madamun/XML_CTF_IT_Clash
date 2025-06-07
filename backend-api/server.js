const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoute = require('./routes/auth');
const xxeRoute = require('./routes/xxeroutes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/xxe', xxeRoute);
const frontendDistPath = path.join(__dirname, 'frontend_dist');
app.use(express.static(frontendDistPath));


// const frontendAppPublicPath = path.join(__dirname, '../frontend-app/public');
// console.log(`Serving static files from: ${frontendAppPublicPath}`);
// app.use(express.static(frontendAppPublicPath));

app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
});


// app.get('/{*any}', (req, res) => {
//     res.sendFile(path.join(frontendAppPublicPath, 'index.html'));
//     // res.sendFile(path.join(frontendAppPublicPath, 'index.html'));
    
// });

app.listen(PORT, () => {
    console.log(`Backend API server running on http://localhost:${PORT}`);
    console.log(`Frontend should be accessible (e.g., http://localhost:3000 if using dev server, or via this server if static files are served)`);
});