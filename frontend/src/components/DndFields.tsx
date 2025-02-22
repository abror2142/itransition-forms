import { useState } from "react";

import SortableFormField from "./SortableFormField";
import {
    closestCenter,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DndContext,
  } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useForm from "../hooks/useForm";
import { FormField } from "../types/FormField";

function DndFields () {
    const { updateDraggable, formFields } = useForm();
    const [activeField, setActiveField] = useState<FormField | undefined>(undefined);
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const activeField = formFields.find((field) => field.sequence == active.id);
        setActiveField(activeField);
      };
    
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;
    
        const activeNode = formFields.find((field) => field.sequence == active?.id);
        const overNode = formFields.find((field) => field.sequence == over?.id);
        console.log(activeNode, overNode);
    
        if (!activeField || !overNode) return;
    
        const activeIndex = formFields.findIndex(
          (field) => field.sequence == active.id
        );
        const overIndex = formFields.findIndex(
          (field) => field.sequence == over.id
        );
    
        if (activeIndex !== overIndex) {
          updateDraggable(activeIndex, overIndex);
        }
        setActiveField(undefined);
      };
    
    const handleDragCancel = () => {
        setActiveField(undefined);
      };
    
    return (
        <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={formFields.map((field) => field.sequence)}
          strategy={verticalListSortingStrategy}
        >
          {formFields.map((formField) => (
            <SortableFormField key={formField.id} formField={formField} />
          ))}
        </SortableContext>

        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {activeField ? (
            <SortableFormField formField={activeField} forceDragging={true} />
          ) : null}
        </DragOverlay>
      </DndContext>
    )
}

export default DndFields;