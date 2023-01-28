import PrivateRootRoutes from './private.root.routes';
import PrivateMarketplaceRoutes from './private.marketplace.routes';
import PrivateGarimpaitorRoutes from './private.garimpaitor.routes';
import PublicRoutes from './public.routes';

import LoadingFullPage from '../components/LoadingFullPage';
import { useAuth } from '../contexts/authContext';

function Routes() {
  const { isLogged, loading, userCurrent } = useAuth();

  if (loading) {
    return (
      <LoadingFullPage text='Carregando as rotas...' />
    )
  }

  const getRoutes = () => {
    // Routes - LOGGED OUT
    if (!isLogged) {
      return <PublicRoutes />
    }

    // Routes - ROOTS
    if (userCurrent.isRoot) {
      return <PrivateRootRoutes />
    }

    // Routes - MARKETPLACE
    if (userCurrent.type === 'M') {
      return <PrivateMarketplaceRoutes />
    }

    // Routes - GARIMPAITOR
    return <PrivateGarimpaitorRoutes />
  }

  return getRoutes();
}

export default Routes;
