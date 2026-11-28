import * as announcementRepository from "./repository.ts";
import type { I_Announcement, I_CreateAnnouncement, I_UpdateAnnouncement } from "./types.ts";

// region create
export const createAnnouncement = async (data: I_CreateAnnouncement) : Promise<I_CreateAnnouncement> => {
    return announcementRepository.createAnnouncement(data)
}

// region update
export const updateAnnouncement = async (announcementId: string, data: I_UpdateAnnouncement) : Promise<I_UpdateAnnouncement> => {
    return announcementRepository.updateAnnouncement(announcementId, data)
}

// region delete
export const deleteAnnouncement = async (announcementId: string) : Promise<I_Announcement> => {
    return announcementRepository.deleteAnnouncement(announcementId)
}

// region getOne
export const getAnnouncement = async (id: string): Promise<I_Announcement> => {
    return announcementRepository.getAnnouncement(id);
};

// region getAll
export const getAllAnnouncements = async (): Promise<I_Announcement[]> => {
    return announcementRepository.getAllAnnouncements();
};