import { v4 as uuid4 } from 'uuid';

class Text {
    id: string;
    type: string;
    title: string;
    description: string | null;
    sequence: number;
    
    constructor(id=null, title="Text Title", description="Description (optional)", sequence=0, type="text") {
        this.id = id == null ? uuid4() : id;
        this.type = type;
        this.title = title;
        this.description = description;
        this.sequence = sequence;
    }   
}

export default Text;