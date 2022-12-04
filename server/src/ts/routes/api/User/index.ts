import express from "express";
import { Database } from "../../../database";

const router = express.Router();
const Users = new Database({ collection: 'users', database: 'Users' });

router.get('/view');
router.get('/new');
router.get('/delete');
router.get('/verify');
router.get('/history');
router.get('/auth');

export default router;