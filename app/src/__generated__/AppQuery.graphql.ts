/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AppQueryVariables = {};
export type AppQueryResponse = {
    readonly me: {
        readonly username: string;
        readonly id: string;
    } | null;
};
export type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};



/*
query AppQuery {
  me {
    username
    id
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "alias": null,
            "args": null,
            "concreteType": "UserType",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "username",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": [],
            "kind": "Fragment",
            "metadata": null,
            "name": "AppQuery",
            "selections": (v0 /*: any*/),
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "AppQuery",
            "selections": (v0 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "AppQuery",
            "operationKind": "query",
            "text": "query AppQuery {\n  me {\n    username\n    id\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '1667fb7fb472ec41c58927508ce4e971';
export default node;
