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
                    readonly completed: boolean;
                    readonly winner: {
                        readonly team: {
                            readonly name: string;
                        };
                    } | null;
                    readonly team1: {
                        readonly seed: number;
                        readonly eliminated: boolean;
                        readonly team: {
                            readonly name: string;
                        };
                    } | null;
                    readonly team2: {
                        readonly seed: number;
                        readonly eliminated: boolean;
                        readonly team: {
                            readonly name: string;
                        };
                    } | null;
                } | null;
            } | null>;
        } | null;
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
    matchSet(orderBy: "round") {
      edges {
        node {
          id
          round
          completed
          winner {
            team {
              name
              id
            }
            id
          }
          team1 {
            seed
            eliminated
            team {
              name
              id
            }
            id
          }
          team2 {
            seed
            eliminated
            team {
              name
              id
            }
            id
          }
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
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "id",
            "variableName": "tourneyId"
        } as any)
    ], v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v3 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
    } as any), v4 = ({
        "alias": null,
        "args": null,
        "concreteType": "GameType",
        "kind": "LinkedField",
        "name": "game",
        "plural": false,
        "selections": [
            (v2 /*: any*/),
            (v3 /*: any*/)
        ],
        "storageKey": null
    } as any), v5 = ({
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
                            (v2 /*: any*/),
                            (v3 /*: any*/),
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
                                                    (v2 /*: any*/)
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
    } as any), v6 = [
        ({
            "kind": "Literal",
            "name": "orderBy",
            "value": "round"
        } as any)
    ], v7 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "round",
        "storageKey": null
    } as any), v8 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "completed",
        "storageKey": null
    } as any), v9 = ({
        "alias": null,
        "args": null,
        "concreteType": "TeamType",
        "kind": "LinkedField",
        "name": "team",
        "plural": false,
        "selections": [
            (v3 /*: any*/)
        ],
        "storageKey": null
    } as any), v10 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "seed",
        "storageKey": null
    } as any), v11 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "eliminated",
        "storageKey": null
    } as any), v12 = [
        (v10 /*: any*/),
        (v11 /*: any*/),
        (v9 /*: any*/)
    ], v13 = ({
        "alias": null,
        "args": null,
        "concreteType": "TeamType",
        "kind": "LinkedField",
        "name": "team",
        "plural": false,
        "selections": [
            (v3 /*: any*/),
            (v2 /*: any*/)
        ],
        "storageKey": null
    } as any), v14 = [
        (v10 /*: any*/),
        (v11 /*: any*/),
        (v13 /*: any*/),
        (v2 /*: any*/)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "TourneyPageQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "TourneyType",
                    "kind": "LinkedField",
                    "name": "tourney",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
                        (v3 /*: any*/),
                        (v4 /*: any*/),
                        (v5 /*: any*/),
                        {
                            "alias": null,
                            "args": (v6 /*: any*/),
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
                                                (v2 /*: any*/),
                                                (v7 /*: any*/),
                                                (v8 /*: any*/),
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "TeamTourneyType",
                                                    "kind": "LinkedField",
                                                    "name": "winner",
                                                    "plural": false,
                                                    "selections": [
                                                        (v9 /*: any*/)
                                                    ],
                                                    "storageKey": null
                                                },
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "TeamTourneyType",
                                                    "kind": "LinkedField",
                                                    "name": "team1",
                                                    "plural": false,
                                                    "selections": (v12 /*: any*/),
                                                    "storageKey": null
                                                },
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "TeamTourneyType",
                                                    "kind": "LinkedField",
                                                    "name": "team2",
                                                    "plural": false,
                                                    "selections": (v12 /*: any*/),
                                                    "storageKey": null
                                                }
                                            ],
                                            "storageKey": null
                                        }
                                    ],
                                    "storageKey": null
                                }
                            ],
                            "storageKey": "matchSet(orderBy:\"round\")"
                        }
                    ],
                    "storageKey": null
                }
            ],
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "TourneyPageQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "TourneyType",
                    "kind": "LinkedField",
                    "name": "tourney",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
                        (v3 /*: any*/),
                        (v4 /*: any*/),
                        (v5 /*: any*/),
                        {
                            "alias": null,
                            "args": (v6 /*: any*/),
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
                                                (v2 /*: any*/),
                                                (v7 /*: any*/),
                                                (v8 /*: any*/),
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "TeamTourneyType",
                                                    "kind": "LinkedField",
                                                    "name": "winner",
                                                    "plural": false,
                                                    "selections": [
                                                        (v13 /*: any*/),
                                                        (v2 /*: any*/)
                                                    ],
                                                    "storageKey": null
                                                },
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "TeamTourneyType",
                                                    "kind": "LinkedField",
                                                    "name": "team1",
                                                    "plural": false,
                                                    "selections": (v14 /*: any*/),
                                                    "storageKey": null
                                                },
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "TeamTourneyType",
                                                    "kind": "LinkedField",
                                                    "name": "team2",
                                                    "plural": false,
                                                    "selections": (v14 /*: any*/),
                                                    "storageKey": null
                                                }
                                            ],
                                            "storageKey": null
                                        }
                                    ],
                                    "storageKey": null
                                }
                            ],
                            "storageKey": "matchSet(orderBy:\"round\")"
                        }
                    ],
                    "storageKey": null
                }
            ]
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "TourneyPageQuery",
            "operationKind": "query",
            "text": "query TourneyPageQuery(\n  $tourneyId: ID!\n) {\n  tourney(id: $tourneyId) {\n    id\n    name\n    game {\n      id\n      name\n    }\n    teams {\n      edges {\n        node {\n          id\n          name\n          competitorSet {\n            edges {\n              node {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n    matchSet(orderBy: \"round\") {\n      edges {\n        node {\n          id\n          round\n          completed\n          winner {\n            team {\n              name\n              id\n            }\n            id\n          }\n          team1 {\n            seed\n            eliminated\n            team {\n              name\n              id\n            }\n            id\n          }\n          team2 {\n            seed\n            eliminated\n            team {\n              name\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'fc97470bded119a006a65752f35e1abe';
export default node;
