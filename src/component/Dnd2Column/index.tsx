import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import equal from 'deep-equal';
import { Tooltip } from 'react-tippy';
import { KeyValueObject, KeyValueObjectArray, KeyValueObjectArrayObject } from '../../redux/store';
import styles from './dnd2column.module.scss';

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
    // transform: isDragging ? 'scale(1.07)' : 'scale(1)',
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
    flex: 1,
});

interface TProps {
    data: KeyValueObjectArray;
    reorder: (items: KeyValueObjectArray) => void;
    additem: () => void;
    removeitem: (id: string) => void;
    renderItem: (item: KeyValueObject) => JSX.Element;
}

interface TState {
    data: KeyValueObjectArray;
    column1: KeyValueObjectArray;
    column2: KeyValueObjectArray;
}

const Dnd2Column = (props: TProps) => {
    const getDerivedStateFromProps = (props: TProps) => {
        const column1: KeyValueObjectArray = [];
        const column2: KeyValueObjectArray = [];
        if (props.data.length > 0) {
            props.data.map((item, index) => {
                if (index % 2 === 0) {
                    column1.push(item);
                } else {
                    column2.push(item);
                }
            });
        }
        return {
            column1,
            column2,
            data: props.data,
        };
    };

    const state: TState = getDerivedStateFromProps(props);

    const id2List: any = {
        droppable: 'column1',
        droppable2: 'column2',
    };

    const getList = (id: string): KeyValueObjectArray => {
        return id2List[id] == 'column1' ? state['column1'] : state['column2'];
    };

    // a little function to help us with reordering the result
    const reorder = (list: KeyValueObjectArray, startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (
        source: KeyValueObjectArray,
        destination: KeyValueObjectArray,
        droppableSource: DraggableLocation,
        droppableDestination: DraggableLocation
    ) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result: KeyValueObjectArrayObject = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        let c1 = state.column1;
        let c2 = state.column2;
        if (source.droppableId === destination!.droppableId) {
            const column1 = reorder(getList(source.droppableId), source.index, destination!.index);

            if (source.droppableId === 'droppable') {
                c1 = column1;
            } else {
                c2 = column1;
            }
        } else {
            const ttt = move(getList(source.droppableId), getList(destination!.droppableId), source, destination!);
            c1 = ttt.droppable;
            c2 = ttt.droppable2;
        }

        let i = 1;
        c2.map((item) => {
            c1.splice(i, 0, item);
            i = i + 2;
        });
        if (!equal(state.data, c1)) {
            props.reorder(c1);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            className={snapshot.isDraggingOver ? styles.selectedDragItems : styles.unselectedDragItems}
                        >
                            {state.column1.map((item, index) => (
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
                                                        {state.data.length > 1 && (
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
                                                        {state.data.length > 1 && (
                                                            <div
                                                                style={getRemoveIconStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}
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
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            className={snapshot.isDraggingOver ? styles.selectedDragItems : styles.unselectedDragItems}
                        >
                            {state.column2.map((item, index) => (
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
                                                        {state.data.length > 1 && (
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
                                                        {state.data.length > 1 && (
                                                            <div
                                                                style={getRemoveIconStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}
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
        </div>
    );
};

/* Export Component =============================== */
export default Dnd2Column;
