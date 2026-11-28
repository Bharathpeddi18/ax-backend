import { Router } from "express";
import * as announcementController from "./controller.ts";

const router = Router()

router.post(`/`, announcementController.createAnnouncement)
router.put(`/:id`, announcementController.updateAnnouncement)
router.delete('/:id', announcementController.deleteAnnouncement)
router.get('/', announcementController.getAllAnnouncements)
router.get(`/:id`, announcementController.getAnnouncement)

export default router