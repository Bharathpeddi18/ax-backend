import { Request, Response } from "express";
import * as announcementService from "./service.ts";
import { schemaCreateAnnouncement } from "./schema.ts";
import { randomUUID } from "node:crypto";

export const getAllAnnouncements = async (req: Request, res: Response): Promise<void> => {
    try {
        const announcements = await announcementService.getAllAnnouncements();

        res.status(200).json({
            success: true,
            message: "Announcements retrieved successfully",
            data: announcements,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve announcements",
        });
    }
};

export const getAnnouncement = async (req: Request, res: Response): Promise<void> => {
    try {
        const announcement = await announcementService.getAnnouncement(req.params.id as string);

        if (!announcement) {
            res.status(404).json({
                success: false,
                message: "Announcement not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Announcement retrieved successfully",
            data: announcement,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve announcement",
        });
    }
};

export const createAnnouncement = async (req: Request, res: Response): Promise<void> => {
    const sampleData = {
        id: randomUUID(),
        title: "Welcome to AX Portal",
        description: "<p>Welcome to our application.</p>",
        expiry_date: new Date(),
        is_archived: false,
        created_at: new Date(),
        modified_at: new Date(),
        created_by: "00000000-0000-4000-8000-000000000001",
        modified_by: "00000000-0000-4000-8000-000000000001",
    };

    try {
        const validation = schemaCreateAnnouncement.safeParse(sampleData);

        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: "Invalid announcement data",
                errors: validation.error.issues,
            });
            return;
        }

        const announcement = await announcementService.createAnnouncement(validation.data);

        res.status(201).json({
            success: true,
            message: "Announcement created successfully",
            data: announcement,
        });
    } catch (error: any) {
        console.error("Failed to create announcement:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create announcement",
        });
    }
};
