export interface I_Announcement {
    id: string
    title: string
    description: string
    expiry_date: Date
    is_archived: boolean
    created_by: string
    modified_by: string
    created_at: Date
    modified_at: Date
}

export interface I_CreateAnnouncement {
    id: string
    title: string
    description: string
    expiry_date: Date
    is_archived: boolean
    created_by: string
    modified_by: string
    created_at: Date
    modified_at: Date
}

export interface I_UpdateAnnouncement {
    id: string
    title: string
    description: string
    expiry_date: Date
    is_archived: boolean
    modified_by: string
    modified_at: Date
}