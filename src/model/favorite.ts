export interface Favorite {
    id: number;           
    user_id: string;      
    sign_id: number;      
    created_at?: string;  
}


export interface FavoriteWithSign extends Favorite {
    signs?: {
        name: string;
        statement: string;
        image_path: string;
    };
}