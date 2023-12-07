import { createSlice } from '@reduxjs/toolkit'

const initState = () => {
    let searchOptionsDefault = {

        "inn": "7736050003",
        "tonality": "any",
        "limit": "35",
        "startDate": new Date("2019-01-01").toISOString(),
        "endDate": new Date("2023-08-31").toISOString(),
        "maxFullness": false,
        "inBusinessNews": true,
        "onlyMainRole": false,
        "onlyWithRiskFactors": false,
        "includeTechNews": false,
        "includeAnnouncements": false,
        "includeDigests": false,
    }

    let searchRequest = {
        "issueDateInterval": {
            "startDate": "2019-01-01",
            "endDate": "2022-08-31"
        },
        "searchContext": {
            "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                    {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": 7710137066,
                        "maxFullness": true,
                        "inBusinessNews": null
                    }
                ],
                "onlyMainRole": true,
                "tonality": "any",
                "onlyWithRiskFactors": false,
                "riskFactors": {
                    "and": [],
                    "or": [],
                    "not": []
                },
                "themes": {
                    "and": [],
                    "or": [],
                    "not": []
                }
            },
            "themesFilter": {
                "and": [],
                "or": [],
                "not": []
            }
        },
        "searchArea": {
            "includedSources": [],
            "excludedSources": [],
            "includedSourceGroups": [],
            "excludedSourceGroups": []
        },
        "attributeFilters": {
            "excludeTechNews": true,
            "excludeAnnouncements": true,
            "excludeDigests": true
        },
        "similarMode": "duplicates",
        "limit": 10,
        "sortType": "sourceInfluence",
        "sortDirectionType": "desc",
        "intervalType": "month",
        "histogramTypes": [
            "totalDocuments",
            "riskFactors"
        ]
    }
    let searchOptions = localStorage.getItem('searchOptions')
        ? JSON.parse(localStorage.getItem('searchOptions'))
        : searchOptionsDefault

    return { searchOptions: searchOptions, searchRequest: searchRequest }
}

const slice = createSlice({
    name: 'search',
    // initialState: { expire: null, accessToken: null },
    initialState: initState,
    reducers: {
        setSearchOptions: (
            state,
            { payload: searchOptions }
        ) => {
            state.searchOptions = searchOptions;
            localStorage.setItem('searchOptions', JSON.stringify(searchOptions));
        },
        resetCredentials: (state) => {
            state.expire = null;
            state.accessToken = null;
            localStorage.removeItem('expire');
            localStorage.removeItem('accessToken');
            // localStorage.clear();

        },
        makeSearchRequest: (state) => {
            let clone = { ...state };
            clone.searchRequest['searchContext']['targetSearchEntitiesContext']['targetSearchEntities'][0]['inn'] = JSON.stringify(clone.searchRequest['inn']);
            clone.searchRequest['searchContext']['targetSearchEntitiesContext']['targetSearchEntities']['tonality'] = clone.searchRequest['tonality'];
            clone.searchRequest['limit'] = JSON.stringify(clone.searchRequest['limit']);
            clone.searchRequest['issueDateInterval']['startDate'] = JSON.stringify(clone.searchRequest['startDate']);
            clone.searchRequest['issueDateInterval']['endDate'] = JSON.stringify(clone.searchRequest['endDate']);
            clone.searchRequest['searchContext']['targetSearchEntitiesContext']['targetSearchEntities'][0]['maxFullness'] = JSON.stringify(clone.searchRequest['maxFullness']);
            clone.searchRequest['searchContext']['targetSearchEntitiesContext']['targetSearchEntities'][0]['inBusinessNews'] = JSON.stringify(clone.searchRequest['maxFullness']);
            clone.searchRequest['searchContext']['targetSearchEntitiesContext']['targetSearchEntities']['onlyMainRole'] = JSON.stringify(clone.searchRequest['onlyMainRole']);
            clone.searchRequest['searchContext']['targetSearchEntitiesContext']['targetSearchEntities']['onlyWithRiskFactors'] = JSON.stringify(clone.searchRequest['onlyWithRiskFactors']);
            // revert
            clone.searchRequest['attributeFilters']['excludeTechNews'] = JSON.stringify(!clone.searchRequest['includeTechNews']);
            clone.searchRequest['attributeFilters']['excludeAnnouncements'] = JSON.stringify(!clone.searchRequest['includeAnnouncements']);
            clone.searchRequest['attributeFilters']['excludeDigests'] = JSON.stringify(!clone.searchRequest['includeDigests']);
            return { ...clone }

        },
    },
})

export const { makeSearchRequest, setSearchOptions } = slice.actions

export default slice.reducer

export const selectSearchOptions = (state) => state.search.searchOptions
export const selectSearchRequest = (state) => state.search.searchRequest
