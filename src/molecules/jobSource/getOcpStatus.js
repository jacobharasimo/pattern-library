import { jobSourceStatus } from './jobSourceStatus';

export const getOcpStatus = status => {
  switch (status) {
    case 'automatic':
      return {
        statusColor: 'success',
        status: 'Daily update',
        explanationText: jobSourceStatus[status],
      };
    case 'manual':
      return {
        statusColor: 'success',
        status: 'Monthly update',
        explanationText: jobSourceStatus[status],
      };
    case 'brand_new':
      return {
        statusColor: 'blue',
        status: 'Under review',
        explanationText: jobSourceStatus[status],
      };
    case 'requires_verification':
      return {
        statusColor: 'blue',
        status: 'Under review',
        explanationText: jobSourceStatus[status],
      };
    case 'errored':
      return {
        statusColor: 'blue',
        status: 'Under review',
        explanationText: jobSourceStatus[status],
      };
    case 'unidentifiable':
      return {
        statusColor: 'warning',
        status: 'Needs action',
        explanationText: jobSourceStatus[status],
      };
    case 'bypassed':
      return {
        statusColor: 'neutral.300',
        status: 'Excluded',
        explanationText: jobSourceStatus[status],
      };
    default:
      return { statusColor: 'transparent', status, explanationText: null };
  }
};
