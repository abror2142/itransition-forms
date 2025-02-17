import { v4 as uuid4 } from 'uuid';

class Image {
    id: string;
    type: string;
    title: string;
    caption: string | null;
    image: string;
    sequence: number;
    
    constructor(id=null, title="Image Title", image="", caption=null, sequence=0, type="image") {
        this.id = id == null ? uuid4() : id;
        this.type = type;
        this.title = title;
        this.caption = caption;
        this.image = image;
        this.sequence = sequence;
    }   
}

export default Image;