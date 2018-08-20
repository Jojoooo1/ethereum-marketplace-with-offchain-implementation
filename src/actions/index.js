export { default as AT_PRODUCTS } from './types/types-product';
export { default as AT_ADMINS } from './types/types-admin';

export { getProductsByOwner, getProductById } from './actions/actions-product';
export { getAdmins, addAdmin, removeAdmin } from './actions/actions-admin';
