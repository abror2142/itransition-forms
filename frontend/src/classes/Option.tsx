import { v4 as uuid4 } from 'uuid';

class Option {
    id: string;
    content: string;

    constructor(content="Another Option") {
        this.id = uuid4();
        this.content = content;
    }
}

export default Option;