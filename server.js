const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const app = express();
const session = require('express-session');
process.env.TZ = 'UTC';
app.use(cors('https://danish-2709.github.io/react-pdf-client'));
app.use(session({ secret: 'H#k7^P3wLs&Rt@9v!ZnY5qR8zFkA2eV', resave: true, saveUninitialized: true  })); 
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to the root of the School server!');
});

/*----------------------------------------------------------------
----------------API For Create Class page ------------------------
--------------------------------------------------------------- */
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-';
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Server-side code (Express)
const upload2 = multer({ storage: storage2 }).array('pdf', 10);

app.post('/api/File', (req, res) => {
    upload2(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log('Multer error:', err.message);
            return res.status(400).json({ error: err.message });
        } else if (err) {
            console.log('Error uploading files:', err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        // Files have been successfully uploaded
        console.log('Files uploaded:', req.files);
        res.status(200).json({ success: true });
    });
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = router;
