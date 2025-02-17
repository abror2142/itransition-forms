import { v4 as uuid4 } from 'uuid';
import Option from './Option';
import { SelectOption } from '../types/SelectOption';
import { ALLOWED_QUESTION_TYPES } from '../../config';

class Question {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    required: boolean;
    questionType: SelectOption | null;
    attributes: string[];
    options: Option[];
    sequence: number;
    type: string;
    
    constructor(id=null, title="Your question...", description=null, image=null, required=false, sequence=0, questionType=ALLOWED_QUESTION_TYPES[0], attributes=[], options=[], type='question') {
        this.id = id == null ? uuid4() : id;
        this.title = title,
        this.description = description,
        this.image = image,
        this.required = required,
        this.sequence = sequence,
        this.questionType = questionType,
        this.attributes = attributes,
        this.options = options,
        this.type = type
    }   
}

export default Question;