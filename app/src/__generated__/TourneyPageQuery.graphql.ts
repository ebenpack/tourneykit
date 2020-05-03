/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TourneyPageQueryVariables = {
    tourneyId: string;
};
export type TourneyPageQueryResponse = {
    readonly tourney: {
        readonly id: string;
        readonly name: string;
        readonly game: {
            readonly id: string;
            readonly name: string;
        };
        readonly teams: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly name: string;
                    readonly competitorSet: {
                        readonly edges: ReadonlyArray<{
                            readonly node: {
                                readonly id: string;
                            } | null;
                        } | null>;
                    };
                } | null;
            } | null>;
        };
        readonly matchSet: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly round: number;
                } | null;
            } | null>;
        };
    } | null;
};
export type TourneyPageQuery = {
    readonly response: TourneyPageQueryResponse;
    readonly variables: TourneyPageQueryVariables;
};



/*
query TourneyPageQuery(
  $tourneyId: ID!
) {
  tourney(id: $tourneyId) {
    id
    name
    game {
      id
      name
    }
    teams {
      edges {
        node {
          id
          name
          competitorSet {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
    matchSet {
      edges {
        node {
          id
          round
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "tourneyId",
            "type": "ID!"
        } as any)
    ], v1 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
    } as any), v3 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "tourneyId"
                }
            ],
            "concreteType": "TourneyType",
            "kind": "LinkedField",
            "name": "tourney",
            "plural": false,
            "selections": [
                (v1 /*: any*/),
                (v2 /*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "GameType",
                    "kind": "LinkedField",
                    "name": "game",
                    "plural": false,
                    "selections": [
                        (v1 /*: any*/),
                        (v2 /*: any*/)
                    ],
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "TeamTypeConnection",
                    "kind": "LinkedField",
                    "name": "teams",
                    "plural": false,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "TeamTypeEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                                {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "TeamType",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                        (v1 /*: any*/),
                                        (v2 /*: any*/),
                                        {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "CompetitorTypeConnection",
                                            "kind": "LinkedField",
                                            "name": "competitorSet",
                                            "plural": false,
                                            "selections": [
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "CompetitorTypeEdge",
                                                    "kind": "LinkedField",
                                                    "name": "edges",
                                                    "plural": true,
                                                    "selections": [
                                                        {
                                                            "alias": null,
                                                            "args": null,
                                                            "concreteType": "CompetitorType",
                                                            "kind": "LinkedField",
                                                            "name": "node",
                                                            "plural": false,
                                                            "selections": [
                                                                (v1 /*: any*/)
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
                                    "storageKey": null
                                }
                            ],
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "MatchTypeConnection",
                    "kind": "LinkedField",
                    "name": "matchSet",
                    "plural": false,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "MatchTypeEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                                {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "MatchType",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                        (v1 /*: any*/),
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "round",
                                            "storageKey": null
                                        }
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
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "TourneyPageQuery",
            "selections": (v3 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "TourneyPageQuery",
            "selections": (v3 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "TourneyPageQuery",
            "operationKind": "query",
            "text": "query TourneyPageQuery(\n  $tourneyId: ID!\n) {\n  tourney(id: $tourneyId) {\n    id\n    name\n    game {\n      id\n      name\n    }\n    teams {\n      edges {\n        node {\n          id\n          name\n          competitorSet {\n            edges {\n              node {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n    matchSet {\n      edges {\n        node {\n          id\n          round\n        }\n      }\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '0cef42219c2853a7a4fe5a7eeb7b961f';
export default node;
