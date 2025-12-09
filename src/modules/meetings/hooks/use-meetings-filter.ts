import { INITIAL_PAGE } from '@/app/constants';
import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';
import { TMeetingStatus } from '../types';

export function useMeetingsFilter() {
    return useQueryStates({
        search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
        page: parseAsInteger.withDefault(INITIAL_PAGE).withOptions({ clearOnDefault: true }),
        status: parseAsStringEnum(Object.values(TMeetingStatus)).withOptions({ clearOnDefault: true }),
        agentId: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    })
}