import { Router } from "express";
import announcementRouter from './announcements/routes.ts'

const router = Router()

router.use('/announcements', announcementRouter);

export default router