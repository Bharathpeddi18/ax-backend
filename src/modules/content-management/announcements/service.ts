import * as announcementRepository from "./repository.ts";
import type { I_Announcement } from "./types.ts";

export const getAllAnnouncements = async (): Promise<I_Announcement[]> => {
    return announcementRepository.getAllAnnouncements();
};

export const getAnnouncement = async (id: string): Promise<I_Announcement> => {
    return announcementRepository.getAnnouncement(id);
};

export const createAnnouncement = async (data: I_Announcement) : Promise<I_Announcement> => {
    return announcementRepository.createAnnouncement(data)
}
