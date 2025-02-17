import {
  SelectOption,
  SelectOptionCreatable,
  SelectOptionUser,
} from "../types/SelectOption";
import { v4 as uuid4 } from "uuid";

class FormInfo {
  id: string;
  title: string;
  description: string | null;
  type: SelectOption | null;
  image: string | null;
  tags: SelectOptionCreatable[];
  users: SelectOptionUser[];
  topic: SelectOption | null;

  constructor(
    id = uuid4(),
    title = "Untitled Form",
    description = "Form description",
    type = null,
    image = null,
    users = [],
    topic = null,
    tags = []
  ) {
    this.id = id;
    (this.title = title),
      (this.description = description),
      (this.type = type),
      (this.image = image),
      (this.users = users),
      (this.topic = topic);
    this.tags = tags;
  }
}

export default FormInfo;
