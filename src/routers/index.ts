import { requestEmailChange } from './SettingsRouter';
import { create, edit, remove } from './TodoRouter';

export const router = {
  settings: {
    requestEmailChange,
  },
  todo: {
    create,
    edit,
    remove,
  },
};
