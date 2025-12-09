import { parseAsInteger, parseAsString, createLoader, parseAsStringEnum } from 'nuqs/server';
import { INITIAL_PAGE } from "@/app/constants";
import { TMeetingStatus } from './types';

export const filterSearchParams = {
    search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(INITIAL_PAGE).withOptions({ clearOnDefault: true }),
    status: parseAsStringEnum(Object.values(TMeetingStatus)).withOptions({ clearOnDefault: true }),
    agentId: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
}

export const loadSearchParams = createLoader(filterSearchParams);