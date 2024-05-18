import { combineReducers } from "redux";
import { createMigrate, createTransform, persistReducer } from "redux-persist";
import { MigrationManifest } from "redux-persist/es/types";
import storage from "redux-persist/lib/storage";
import { resetStore } from "../modules/app/actions";

import packageJson from "../../package.json";

const transforms = [
  createTransform(
    (state) => JSON.stringify(state),
    (state) =>
      JSON.parse(state, (key, value) =>
        typeof value === "string" &&
        value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
          ? new Date(value)
          : value
      )
  ),
];

const migrations: MigrationManifest = {
  /* eslint-disable no-underscore-dangle */
  0: (state) => (state ? { _persist: state._persist } : state),
  /* eslint-enable no-underscore-dangle */
};

const rootPersistConfig = {
  key: packageJson.name,
  storage,
  whitelist: [],
  transforms,
  version: 0,
  migrate: createMigrate(migrations),
};

const appReducer = combineReducers({});

const reducer: typeof appReducer = (state, action) => {
  if (action.type === resetStore.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const rootReducer = persistReducer<ReturnType<typeof reducer>>(
  rootPersistConfig,
  reducer
);
