import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import equal from 'deep-equal';
import { Tooltip } from 'react-tippy';

import styles from './dnd.module.scss';
import { KeyValueObject, KeyValueObjectArray } from '../../template/One/one';

const getDragIconStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    width: '26px',
    height: '26px',
    //background: '#03a9f4',
    background: isDragging ? '#03a9f4' : '#03a9f4',
    position: 'absolute',
    borderRadius: '100%',
    top: -13,
    right: 30,
    ...draggableStyle,
});
const getAddIconStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    width: '26px',
    height: '26px',
    //background: '#03a9f4',
    background: isDragging ? '#03a9f4' : '#03a9f4',
    position: 'absolute',
    borderRadius: '100%',
    top: -13,
    right: 0,
    cursor: 'pointer',
    ...draggableStyle,
});
const getRemoveIconStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    width: '26px',
    height: '26px',
    //background: '#03a9f4',
    background: isDragging ? '#03a9f4' : '#03a9f4',
    position: 'absolute',
    borderRadius: '100%',
    top: -13,
    right: 60,
    cursor: 'pointer',
    ...draggableStyle,
});
const getDraggedStyle = (isDragging: boolean) => ({
    //position: 'relative',
    '-webkit-box-shadow': isDragging ? '0px 0px 24px 0px rgba(0,0,0,0.16)' : 'none',
    '-moz-box-shadow': isDragging ? '0px 0px 24px 0px rgba(0,0,0,0.16)' : 'none',
    'box-shadow': isDragging ? '0px 0px 24px 0px rgba(0,0,0,0.16)' : 'none',
    background: isDragging ? 'rgba(250,250,250,1)' : '#fff',
});

const getListStyle = (isDraggingOver: boolean) => ({
    '-webkit-box-shadow': isDraggingOver ? 'inset 0px 0px 18px 0px rgba(0,0,0,0.08)' : 'none',
    '-moz-box-shadow': isDraggingOver ? 'inset 0px 0px 18px 0px rgba(0,0,0,0.08)' : 'none',
    'box-shadow': isDraggingOver ? 'inset 0px 0px 18px 0px rgba(0,0,0,0.08)' : 'none',
    background: isDraggingOver ? 'rgba(250,250,250,1)' : '#fff',
});

interface TProps {
    data: KeyValueObjectArray;
    reorder: (items: KeyValueObjectArray) => void;
    additem: () => void;
    removeitem: (id: string) => void;
    renderItem: (item: KeyValueObject) => JSX.Element;
}

const Dnd = (props: TProps) => {
    // a little function to help us with reordering the result
    const reorder = (list: KeyValueObjectArray, startIndex: number, endIndex: number): KeyValueObjectArray => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const data = reorder(props.data, result.source.index, result.destination.index);

        if (!equal(props.data, data)) {
            props.reorder(data);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className={snapshot.isDraggingOver ? styles.selectedDragItems : styles.unselectedDragItems}
                    >
                        {props.data.map((item: any, index: number) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef}>
                                        <div {...provided.draggableProps}>
                                            <div style={{ position: 'relative' }}>
                                                <div className={styles.dragBox} style={getDraggedStyle(snapshot.isDragging)}>
                                                    {props.renderItem(item)}
                                                    <div
                                                        style={getAddIconStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                        className={styles.dragBoxIcon}
                                                        onClick={() => props.additem()}
                                                    >
                                                        <Tooltip title="Add New Item" arrow distance={20}>
                                                            <i className={'material-icons ' + styles.dndIcon}>add</i>
                                                        </Tooltip>
                                                    </div>
                                                    {props.data.length > 1 && (
                                                        <div
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getDragIconStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                            className={styles.dragBoxIcon}
                                                        >
                                                            <Tooltip title="Change Position" arrow distance={20}>
                                                                <i className={'material-icons ' + styles.dndIcon}>drag_handle</i>
                                                            </Tooltip>
                                                        </div>
                                                    )}
                                                    {props.data.length > 1 && (
                                                        <div
                                                            style={getRemoveIconStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                            className={styles.dragBoxIcon}
                                                            onClick={() => props.removeitem(item.id)}
                                                        >
                                                            <Tooltip title="Remove" arrow distance={20}>
                                                                <i className={'material-icons ' + styles.dndIcon}>remove</i>
                                                            </Tooltip>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

/* Export Component =============================== */
export default Dnd;
