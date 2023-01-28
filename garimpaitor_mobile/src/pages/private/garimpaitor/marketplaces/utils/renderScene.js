import FormMarketplaceData from '../components/FormMarketplace/FormMarketplaceData';
import FormGroup from '../components/FormMarketplace/FormGroup';
import FormAddressInitial from '../components/FormMarketplace/FormAddressInitial';
import FormAddress from '../components/FormMarketplace/FormAddress';
import FormAction from '../components/FormMarketplace/FormAction';

const renderScene = (route, titlesScreens, formik, open, configSnackbar, setOpen, handlesModais, loadings, isView = false) => {

  const { handleOpenModalNetwork, handleOpenModalBrand, handleOpenModalState, handleOpenModalCity } = handlesModais;
  const {
    loadingGetAllNetwork,
    loadingGetBrandForNetwork,
    loadingGetStates,
    loadingGetCitys,
    loadingActionMarketplace
  } = loadings;

  if (route.key === 'marketplace')
    return (
      <FormMarketplaceData
        formik={formik}
        title={titlesScreens.titleFormMarketplaceData}
        open={open}
        configSnackbar={configSnackbar}
        setOpen={setOpen}
        isView={isView}
      />
    )

  if (route.key === 'group')
    return (
      <FormGroup
        formik={formik}
        title={titlesScreens.titleFormGroup}
        open={open}
        configSnackbar={configSnackbar}
        setOpen={setOpen}
        handleOpenModalNetwork={handleOpenModalNetwork}
        loadingGetAllNetwork={loadingGetAllNetwork}
        handleOpenModalBrand={handleOpenModalBrand}
        loadingGetBrandForNetwork={loadingGetBrandForNetwork}
        isView={isView}
      />
    )

  if (route.key === 'addressInitial')
    return (
      <FormAddressInitial
        formik={formik}
        title={titlesScreens.titleFormAddressInitial}
        open={open}
        configSnackbar={configSnackbar}
        setOpen={setOpen}
        handleOpenModalState={handleOpenModalState}
        loadingGetStates={loadingGetStates}
        handleOpenModalCity={handleOpenModalCity}
        loadingGetCitys={loadingGetCitys}
        isView={isView}
      />
    )

  if (route.key === 'address')
    return (
      <FormAddress
        formik={formik}
        title={titlesScreens.titleFormAddress}
        open={open}
        configSnackbar={configSnackbar}
        setOpen={setOpen}
        isView={isView}
      />
    )

  if (route.key === 'action')
    return (
      <FormAction
        formik={formik}
        title={titlesScreens.titleFormActions}
        open={open}
        configSnackbar={configSnackbar}
        setOpen={setOpen}
        loading={loadingActionMarketplace}
        isView={isView}
      />
    )

}

export default renderScene;
