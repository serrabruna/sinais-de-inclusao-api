export interface Sign {
    id: number;               
    category_id: number;      
    name: string;             
    statement: string;        
    image_path: string;       
    correct_answer: string;   
    options: string[];        
    created_at?: string;      
}