import { pool } from "../../../config/database.ts";
import { DB_TABLE_NAMES } from "../../../config/global.config.ts";
import { I_Announcement, I_CreateAnnouncement, I_UpdateAnnouncement } from "./types.ts";

const TABLE_NAME = DB_TABLE_NAMES.content_management.announcements;

// region create
export const createAnnouncement = async (data: I_CreateAnnouncement): Promise<I_CreateAnnouncement> => {
    const { title, description, expiry_date, is_archived, created_by, created_at, modified_by, modified_at } = data;

    const query = await pool.query<I_CreateAnnouncement>(
        `INSERT INTO ${TABLE_NAME}
            (
                title,
                description,
                expiry_date,
                is_archived,
                created_at,
                modified_at,
                created_by,
                modified_by
            )
            VALUES(
                $1, $2, $3, $4, $5, $6, $7, $8
            )
        RETURNING *`,
        [title, description, expiry_date, is_archived, created_at, modified_at, created_by, modified_by]
    );

    return query.rows[0];
};

// region update
export const updateAnnouncement = async (announcementId:string, data: I_UpdateAnnouncement): Promise<I_UpdateAnnouncement> => {
    const {title, description, expiry_date, is_archived, modified_by, modified_at} = data

    const query = await pool.query<I_UpdateAnnouncement>(
        `UPDATE ${TABLE_NAME}
        SET 
            title = $2,
            description = $3,
            expiry_date = $4,
            is_archived = $5,
            modified_at = $6,
            modified_by = $7
        WHERE id = $1
        RETURNING *`,
        [announcementId, title, description, expiry_date, is_archived, modified_at, modified_by]
    )

    return query.rows[0];
}

// region delete
export const deleteAnnouncement = async (announcementId:string): Promise<I_Announcement> => {

    const query = await pool.query<I_Announcement>(
        `DELETE FROM ${TABLE_NAME} 
         WHERE id = $1
         RETURNING *`,
        [announcementId]
    )

    return query.rows[0];
}

// region getOne
export const getAnnouncement = async (id: string): Promise<I_Announcement> => {
    const query = await pool.query<I_Announcement>(
        `SELECT 
            id,
            title,
            description,
            expiry_date,
            is_archived,
            created_at,
            modified_at,
            created_by,
            modified_by
        FROM ${TABLE_NAME} WHERE id=$1`, [id]
    );

    return query.rows[0];
};

// region getAll
export const getAllAnnouncements = async (): Promise<I_Announcement[]> => {
    const query = await pool.query<I_Announcement>(
        `SELECT 
            id,
            title,
            description,
            expiry_date,
            is_archived,
            created_at,
            modified_at,
            created_by,
            modified_by
        FROM ${TABLE_NAME} ORDER BY modified_at DESC`,
    );

    return query.rows;
};