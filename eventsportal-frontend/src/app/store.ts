import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Create a simple reducer for now
const initialState = {
  user: null,
  events: [],
  tickets: []
}

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'] // Only persist user data
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 