export const getCoreConfigsQuery = `
    query coreConfigs($first: Int, $page: Int, $input: FilterCoreConfigInput) {
        coreConfigs(first: $first, page: $page, input: $input) {
            paginatorInfo {
                count
                currentPage
                lastPage
                total
            }
            data {
                id
                code
                value
                channelCode
                localeCode
            }
        }
    }
`;

export const getCoreConfigQuery = `
  query coreConfig($code: String!) {
    coreConfig(code: $code)
  }
`;

