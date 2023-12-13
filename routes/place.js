//Loading the Dependencies
const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
router.use(methodOverride('_method'));
const placeCntrl = require("../controllers/place")

router.use(express.urlencoded({extended: true}))

// Multer
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
  })
  let upload = multer({ storage: storage })

// Require the auth middleware
const ensureLoggedIn = require('../config/ensureLoggedIn');

// router.get("/add", ensureLoggedIn, placeCntrl.place_create_get);
// router.post("/add", ensureLoggedIn, placeCntrl.place_create_post);

//Routes
router.get("/add", ensureLoggedIn,placeCntrl.place_create_get);
router.post("/add", upload.single('placeImg'), ensureLoggedIn, placeCntrl.place_create_post);
router.get("/index", placeCntrl.place_index_get);
router.get("/detail", placeCntrl.place_show_get);
router.delete("/delete", placeCntrl.place_delete_get);
router.get("/edit", placeCntrl.place_edit_get);
router.put("/update", placeCntrl.place_update_put);

//Exporting 
module.exports = router;

