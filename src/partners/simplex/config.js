import { mewSimplex } from '../partnersConfig';

const SimplexCurrencies = {
  fiat: {
    USD: {
      symbol: 'USD',
      name: 'US Dollar'
    },
    EUR: {
      symbol: 'EUR',
      name: 'Euro'
    }
  },
  digital: {
    BTC: {
      symbol: 'BTC',
      name: 'Bitcoin'
    },
    ETH: {
      symbol: 'ETH',
      name: 'Ether'
    }
  }
};

const statuses = {
  new: 'new',
  initiated: 'INITIATED',
  declined: 'simplexcc_declined',
  pending: 'pending_simplexcc_approval',
  payment: 'pending_simplexcc_payment_to_partner',
  sent: 'SENT_TO_SIMPLEX',
  cancelled: 'cancelled'
};

const MIN_FIAT = 50;
const MAX_FIAT = 20000;
const PROVIDER_NAME = 'simplex';

const host = {
  url: process.env.SIMPLEX_API_HOST || mewSimplex
};

export { SimplexCurrencies, host, statuses, MIN_FIAT, MAX_FIAT, PROVIDER_NAME };
