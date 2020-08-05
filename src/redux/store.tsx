import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export type KeyValueObject = { [key: string]: string };
export type KeyValueObjectArray = KeyValueObject[];

export interface AppStore {
    userData: KeyValueObject;
    workExperience: KeyValueObjectArray;
    education: KeyValueObjectArray;
    skills: KeyValueObjectArray;
    theme: {
        color: string;
        fontFamily: string;
    };
    itemStatus: {
        [key: string]: boolean;
    };
}

const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['userData', 'workExperience', 'education', 'skills', 'theme', 'itemStatus'], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore: Store<AppStore> = createStore<AppStore & PersistPartial, any, any, any>(
    persistedReducer,
    /* preloadedState, */
    composeWithDevTools(applyMiddleware(thunk))
);
