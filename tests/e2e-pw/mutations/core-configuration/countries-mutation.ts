export const getAllCountriesQuery = `
    query countries {
    countries {
        id
        code
        name
        translations {
            id
            locale
            name
            countryId
        }
        states {
            id
            countryCode
            code
            defaultName
            countryId
            translations {
                id
                locale
                defaultName
                countryStateId
            }
        }
    }
}
`;

export const getParticularCountry = `
    query country($id: ID!) {
    country(id: $id) {
        id
        code
        name
        translations {
            id
            locale
            name
            countryId
        }
        states {
            id
            countryCode
            code
            defaultName
            countryId
            translations {
                id
                locale
                defaultName
                countryStateId
            }
        }
    }
}
`;

export const getAllCountryStatesQuery = `
    query countrieStates ($input: FilterCountryStateInput ) {
    countrieStates(input: $input ) {
        id
        countryCode
        code
        defaultName
        countryId
        translations {
            id
            locale
            defaultName
            countryStateId
        }
    }
}
`; 

export const getParticularCountryStateQuery = `
    query countrieState ($id: ID!) {
    countrieState(
        id: $id
    ) {
        id
        countryCode
        code
        defaultName
        countryId
        translations {
            id
            locale
            defaultName
            countryStateId
        }
    }
}
`;