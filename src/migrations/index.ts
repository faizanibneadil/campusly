import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20261125_063212_username_auth from './20261125_063212_username_auth';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20261125_063212_username_auth.up,
    down: migration_20261125_063212_username_auth.down,
    name: '20261125_063212_username_auth'
  },
];
