import { pool } from "../../../config/database.ts";
import { DB_TABLE_NAMES } from "../../../config/global.config.ts";
import { I_Announcement } from "./types.ts";

const TABLE_NAME = DB_TABLE_NAMES.content_management.announcements;

export const getAllAnnouncements = async (): Promise<I_Announcement[]> => {
    const result = await pool.query<I_Announcement>(
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

    return result.rows;
};

export const getAnnouncement = async (id: string): Promise<I_Announcement> => {
    const result = await pool.query<I_Announcement>(
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

    return result.rows[0];
};

export const createAnnouncement = async (data: I_Announcement): Promise<I_Announcement> => {
    const { title, description, expiry_date, is_archived, created_by, created_at, modified_by, modified_at } = data;

    const result = await pool.query<I_Announcement>(
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

    return result.rows[0];
};
