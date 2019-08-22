export default (state: any, { type, data }: any) => {
  switch (type) {
    // case 'GET_ADDRESS_TYPES':
    //   return { ...state, addressTypes: data };
    case 'SET_INITIAL_USER_DATA':
      return { ...state, details: { ...state.details, user: { ...data } } }
    case 'SET_ALL_ADDRESSES_BY_USER':
      return {
        ...state,
        details: { ...state.details, address: data }
      }
    case 'SET_CRYPTO_ADDRESS_BY_ACCOUNT':
      return {
        ...state,
        cryptoAddress: data
      }
    case 'SET_USER_DETAILS':
      return {
        ...state,
        details: { ...state.details, ...data }
      }
    default:
      return state
  }
}
