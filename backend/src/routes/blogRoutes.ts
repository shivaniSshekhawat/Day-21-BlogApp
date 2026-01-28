import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogById,
  publishBlog,
  deleteBlog,
  getAdminBlogs,
} from '../controllers/blogController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .post(protect, createBlog)
  .get(getBlogs);

router.route('/admin')
  .get(protect, admin, getAdminBlogs);

router.route('/:id')
  .get(getBlogById)
  .delete(protect, admin, deleteBlog);

router.route('/:id/publish')
  .put(protect, admin, publishBlog);

export default router;
