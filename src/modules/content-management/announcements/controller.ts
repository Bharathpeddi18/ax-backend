import { Request, Response } from "express";
import * as announcementService from "./service.ts";
import { schemaCreateAnnouncement, schemaUpdateAnnouncement } from "./schema.ts";


// region create
export const createAnnouncement = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = schemaCreateAnnouncement.safeParse(req.body)

        if (validatedData.error) {
            res.status(400).json({
                success: false,
                message: "Invalid Announcement data",
                errors: validatedData.error.issues,
            })
            return
        }

        const announcement = await announcementService.createAnnouncement(validatedData.data)

        res.status(201).json({
            success: true,
            message: "Announcement created successfully",
            data: announcement,
        })
    }
    catch(error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create Announcement",
        })
    }
};

// region update
export const updateAnnouncement = async (req: Request, res: Response): Promise<void> => {
    try{
        const validatedData = schemaUpdateAnnouncement.safeParse(req.body)

        if(validatedData.error){
            res.status(400).json({
                success: false,
                message: 'Invalid Announcement data',
                error: validatedData.error.issues
            })
            return
        }

        const announcement = await announcementService.updateAnnouncement(req.params.id as string,validatedData.data)

        res.status(201).json({
            success: true,
            message: "Announcement updated successfully",
            data: announcement,
        })

    }
    catch(error:any){
        res.status(500).json({
            success: false,
            message: 'Failed to update Announcement',
        })
    }
}

// region dalete
export const deleteAnnouncement = async (req: Request, res: Response): Promise<void> => {
    try{
        const announcement = await announcementService.deleteAnnouncement(req.params.id as string)

        if (!announcement) {
            res.status(404).json({
                success: false,
                message: "Announcement not found",
            })
            return
        }

        res.status(201).json({
            success: true,
            message: "Announcement deleted successfully",
            data: announcement,
        })

    }
    catch(error:any){
        res.status(500).json({
            success: false,
            message: 'Failed to delete Announcement',
        })
    }
}

// region getOne
export const getAnnouncement = async (req: Request, res: Response): Promise<void> => {
    try {
        const announcement = await announcementService.getAnnouncement(req.params.id as string)

        if (!announcement) {
            res.status(404).json({
                success: false,
                message: "Announcement not found",
            })
            return
        }

        res.status(200).json({
            success: true,
            message: "Announcement retrieved successfully",
            data: announcement,
        })
    }
    catch(error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve Announcement",
        })
    }
};

// region getAll
export const getAllAnnouncements = async (req: Request, res: Response): Promise<void> => {
    try {
        const announcements = await announcementService.getAllAnnouncements()

        res.status(200).json({
            success: true,
            message: "Announcements retrieved successfully",
            data: announcements,
        })
    }
    catch(error: any){
        res.status(500).json({
            success: false,
            message: "Failed to retrieve Announcements",
        })
    }
}