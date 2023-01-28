import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';

import MuseumIcon from '@mui/icons-material/Museum';

import StreamIcon from '@mui/icons-material/Stream';
import StorageIcon from '@mui/icons-material/Storage';

export const menusUser = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/redes/listar',
    icon: (<StreamIcon fontSize="small" />),
    title: 'Redes'
  },
  {
    href: '/marcas/listar',
    icon: (<StorageIcon fontSize="small" />),
    title: 'Marcas'
  },
  {
    href: '/mercados/listar',
    icon: (<MuseumIcon fontSize="small" />),
    title: 'Mercados'
  },
  {
    href: '/products',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Products'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  }
];

export const menusUserMarketplace = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/products',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'M Products'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'M Settings'
  }
];

export const menusUserAdim = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/redes/listar',
    icon: (<StreamIcon fontSize="small" />),
    title: 'Redes'
  },
  {
    href: '/marcas/listar',
    icon: (<StorageIcon fontSize="small" />),
    title: 'Marcas'
  },
  {
    href: '/mercados/listar',
    icon: (<MuseumIcon fontSize="small" />),
    title: 'Mercados'
  },
  {
    href: '/usuarios/listar',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Usuários'
  },
  {
    href: '/products',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'ad Products'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'ad Settings'
  }
];

export const menusUserNotlogedIn = [
  {
    href: '/usuarios/login',
    icon: (<LockIcon fontSize="small" />),
    title: 'Login'
  },
  {
    href: '/usuarios/cadastrar',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Cadastrar'
  }
];
