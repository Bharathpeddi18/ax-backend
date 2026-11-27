import { Router } from "express";
import * as announcementController from "./controller.ts";

const router = Router()

router.get('/', announcementController.getAllAnnouncements)
router.get(`/:id`, announcementController.getAnnouncement)
router.post(`/`, announcementController.createAnnouncement)


export default router