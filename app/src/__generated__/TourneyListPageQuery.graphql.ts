/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TourneyListPageQueryVariables = {};
export type TourneyListPageQueryResponse = {
    readonly tourneys: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
                readonly game: {
                    readonly id: string;
                };
            } | null;
        } | null>;
    } | null;
};
export type TourneyListPageQuery = {
    readonly response: TourneyListPageQueryResponse;
    readonly variables: TourneyListPageQueryVariables;
};



/*
query TourneyListPageQuery {
  tourneys(first: 10) {
    edges {
      node {
        id
        name
        game {
          id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10
                }
            ],
            "concreteType": "TourneysTypeConnection",
            "kind": "LinkedField",
            "name": "tourneys",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "TourneysTypeEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "TourneyType",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                                (v0 /*: any*/),
                                {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "name",
                                    "storageKey": null
                                },
                                {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "GameType",
                                    "kind": "LinkedField",
                                    "name": "game",
                                    "plural": false,
                                    "selections": [
                                        (v0 /*: any*/)
                                    ],
                                    "storageKey": null
                                }
                            ],
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ],
            "storageKey": "tourneys(first:10)"
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": [],
            "kind": "Fragment",
            "metadata": null,
            "name": "TourneyListPageQuery",
            "selections": (v1 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "TourneyListPageQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "TourneyListPageQuery",
            "operationKind": "query",
            "text": "query TourneyListPageQuery {\n  tourneys(first: 10) {\n    edges {\n      node {\n        id\n        name\n        game {\n          id\n        }\n      }\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'd2e30b9018b2684e48d258872215d7a3';
export default node;
